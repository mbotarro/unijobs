package dal

import (
	"context"
	"fmt"
	"time"

	"github.com/mbotarro/unijobs/backend/tools"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/olivere/elastic/v7"
)

// RequestDAL interacts with the DB to perform User related queries
type RequestDAL struct {
	db *sqlx.DB
	es *elastic.Client
}

// NewRequestDAL returns a new RequestDAL
func NewRequestDAL(db *sqlx.DB, es *elastic.Client) *RequestDAL {
	return &RequestDAL{
		db: db,
		es: es,
	}
}

// GetLastRequests returns the requests inserted in the dabase before the time specified by timestamp
// The parameter size limits the number of returned requests
func (dal *RequestDAL) GetLastRequests(before time.Time, size int) ([]models.Request, error) {
	reqs := []models.Request{}
	err := dal.db.Select(&reqs,
		`SELECT * FROM request WHERE timestamp < $1
			ORDER BY timestamp DESC
			LIMIT $2`, before.UTC(), size)
	if err != nil {
		return nil, err
	}

	return reqs, nil
}

// InsertRequestInDB Receives a request as a parameter and inserts into the database
func (dal *RequestDAL) InsertRequestInDB(request *models.Request) error {
	// Generate an uuid for the request
	request.ID = uuid.New().String()

	insertQuery := `INSERT INTO request (id, name, description, extrainfo, minprice, maxprice, userid, categoryid, timestamp) 
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	// Gets the controller of the database and executes the query
	_, err := dal.db.Exec(insertQuery, request.ID, request.Name, request.Description, request.ExtraInfo,
		request.MinPrice, request.MaxPrice, request.Userid, request.Categoryid, request.Timestamp)

	// Checks if any error happened during the query execution
	if err != nil {
		return err
	}

	return nil
}

// GetRequestsByID fetch from postgreSQL the requests whose ids are passed in parameter
func (dal *RequestDAL) GetRequestsByID(ids []string) ([]models.Request, error) {
	reqs := []models.Request{}
	query, args, err := sqlx.In(`SELECT * FROM request WHERE id IN (?) ORDER BY timestamp DESC`, ids)
	if err != nil {
		return nil, err
	}

	// Transform (?, ?, ...) in postgres specific ($1, $2, $3)
	query = dal.db.Rebind(query)

	rows, err := dal.db.Queryx(query, args...)
	if err != nil {
		return nil, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error())
	}

	// Transform the fecthed rows into request struct
	for rows.Next() {
		var r models.Request
		err = rows.StructScan(&r)
		reqs = append(reqs, r)
	}

	return reqs, nil
}

// InsertRequestInES inserts a Request in ES
func (dal *RequestDAL) InsertRequestInES(request models.Request) error {
	rES := models.RequestES{
		ID:          request.ID,
		Name:        request.Name,
		Description: request.Description,
		Category:    request.Categoryid,
		Timestamp:   request.Timestamp.Unix(),
	}

	_, err := dal.es.Index().
		Index("request").
		Id(rES.ID).
		BodyJson(rES).
		Refresh("true").
		Do(context.Background())
	if err != nil {
		return fmt.Errorf("%s:%s", errors.ESInsertError, err.Error())
	}

	return nil
}

// SearchInES searches for Requests in ES given a query.
// If one or more category ID is informed, the results are filtered to only contain requests beloging to them.
// A slice with the IDs of the matched requests are returned
func (dal *RequestDAL) SearchInES(query string, categoryIDs ...int) ([]string, error) {
	searchResult, err := searchDocumentInES(dal.es, "request", query, categoryIDs...)
	if err != nil {
		return nil, err
	}

	// Get the matched Requests
	reqs, err := tools.GetRequestsFromSearchResult(searchResult)
	if err != nil {
		return nil, err
	}

	// Get the UUIDs of the matched requests
	ids := make([]string, 0, len(reqs))
	for _, req := range reqs {
		ids = append(ids, req.ID)
	}

	return ids, nil
}
