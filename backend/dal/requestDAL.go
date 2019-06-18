package dal

import (
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/google/uuid"
)

// RequestDAL interacts with the DB to perform User related queries
type RequestDAL struct {
	db *sqlx.DB
}

// NewRequestDAL returns a new RequestDAL
func NewRequestDAL(db *sqlx.DB) *RequestDAL {
	return &RequestDAL{
		db: db,
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
