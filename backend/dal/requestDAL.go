package dal

import (
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
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
	fmt.Println("before: ", before)
	fmt.Println("size: ", size)
	err := dal.db.Select(&reqs,
		`SELECT * FROM request WHERE timestamp < $1
			ORDER BY timestamp DESC
			LIMIT $2`, before.UTC(), size)
	if err != nil {
		return nil, err
	}

	fmt.Println("GOT REQUESTS: ", reqs)
	return reqs, nil
}
