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

// GetLastRequests returns the last 'size' requests inserted in the dabase before the time specified by timestamp
func (dal *RequestDAL) GetLastRequests(before time.Time) ([]models.Request, error) {
	ints := []models.Request{}
	err := dal.db.Select(&ints,
		`SELECT * FROM request WHERE timestamp < $1
			ORDER BY timestamp DESC`, before)
	if err != nil {
		return nil, err
	}

	fmt.Println("GOT REQUESTS: ", ints)

	return ints, nil
}

// GetRequests get all of the requests of a certain user
// func (dal *RequestDAL) GetRequests(userid int) ([]*models.Request, error) {
// 	requests := make([]*models.Request, 0)
// 	rows, err := dal.db.Query("select * from request where id = $1", userid)

// 	for rows.Next() {
// 		request := new(models.Request)
// 		println(request)
// 		if err := rows.Scan(&request.ID, &request.Name, &request.Description, &request.Price, &request.Userid, request.Categoryid); err != nil {
// 			panic(err)
// 		}
// 		requests = append(requests, request)
// 	}
// 	return requests, err
// }
