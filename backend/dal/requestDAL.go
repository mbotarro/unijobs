package dal

import (
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
	ints := []models.Request{}
	err := dal.db.Select(&ints,
		`SELECT * FROM request WHERE timestamp < $1
			ORDER BY timestamp DESC
			LIMIT $2`, before, size)
	if err != nil {
		return nil, err
	}

	return ints, nil
}
