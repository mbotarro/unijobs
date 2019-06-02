package dal

import (
	"fmt"
	"log"
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

// Gets the database connection to be used in requests
func getDB() *sqlx.DB {
	db, err := sqlx.Connect("postgres", "user=postgres dbname=unijobs sslmode=disable host=localhost port=5432")
	if err != nil {
		log.Panicf("Can't connect to the db")
	}

	return db
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
	insertQuery := `INSERT INTO request (name, description, extrainfo, minprice, maxprice, userid, categoryid, timestamp) 
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

	// Gets the controller of the database and executes the query
	fmt.Println(request.Name)
	fmt.Println(request.Description)
	fmt.Println(request.ExtraInfo)
	fmt.Println(request.MinPrice)
	fmt.Println(request.MaxPrice)
	fmt.Println(request.Userid)
	fmt.Println(request.Categoryid)
	fmt.Println(request.Timestamp)

	err := dal.db.MustExec(insertQuery, request.Name, request.Description, request.ExtraInfo, request.MinPrice, request.MaxPrice, request.Userid, request.Categoryid, request.Timestamp)

	// Checks if any error happened during the query execution
	if err != nil {
		panic(err)
	}

	return nil
}
