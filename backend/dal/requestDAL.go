package dal

import (
	"github.com/mbotarro/unijobs/backend/tools"
	"time"
	"context"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/google/uuid"
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

// InsertRequest Receives a request as a parameter and inserts into the database
func (dal *RequestDAL) InsertRequest(request models.Request) error {
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

// InsertRequestInES inserts a Request in the ES
func (dal *RequestDAL) InsertRequestInES(request models.Request) error{
	rES := models.RequestES{
		ID: request.ID,
		Name: request.Name,
		Description: request.Description,
		Category: request.Categoryid,
		Timestamp: request.Timestamp.Unix(),
	}

	_, err := dal.es.Index().
				Index("request").
				Id(rES.ID).
				BodyJson(rES).
				Refresh("true").
				Do(context.Background())
	if err != nil{
		return err
	}
	return nil
}

// SearchInES searches for Requests in ES given a query.
// If one or more category ID is informed, the results are filtered to only contain requests beloging to them.
// A slice with the IDs of the matched queries are returned
func (dal *RequestDAL) SearchInES(query string, categoryIDs ...int) ([]string, error){
	q := elastic.NewMultiMatchQuery(query).
		Type("most_fields"). // The final score is the sum of the matched fields with their respective weight
		FieldWithBoost("name", 2.5). // The match in the name should has a higher score than a match in the description
		FieldWithBoost("description", 1)
	
	b := elastic.NewBoolQuery() // A Bool query is needed to filter the results
	b.Must(q)

	// If any categoryID is passed by the variadic parameter
	if len(categoryIDs) != 0{
		// categoryIDs is an int slice. To use NewTermsQuery, we need an interface{} slice. We need to convert them!
		ids := make([]interface{}, 0, len(categoryIDs))
		for _, id := range categoryIDs{
			ids = append(ids, id)
		}

		// Passes ids to a variadic function
		b.Filter(elastic.NewTermsQuery("category", ids...))
	}

	searchResult, err := dal.es.Search().
			Index("request").
			Query(b).
			Size(30). // TODO: enable pagination
			Sort("_score", false). // Documents with higher score come first
			Sort("timestamp", false). // Sort in descending order by timestamp for documents with same score
			Do(context.Background())
	if err != nil{
		return nil, err
	}

	// Get the matched Requests
	reqs, err := tools.GetRequestFromSearchResult(searchResult)
	if err != nil{
		return nil, err
	}

	// Get the UUIDs of the matched requests
	ids := make([]string, 0, len(reqs))
	for _, req := range reqs{
		ids = append(ids, req.ID)
	}

	return ids, nil;
}

