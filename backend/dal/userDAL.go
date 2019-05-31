package dal

import (
	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
)

// UserDAL interacts with the DB to perform User related queries
type UserDAL struct {
	db *sqlx.DB
}

// NewUserDAL returns a new UserDAL
func NewUserDAL(db *sqlx.DB) *UserDAL {
	return &UserDAL{
		db: db,
	}
}

// AuthenticateUser returns if an user is a valid one
func (dal *UserDAL) AuthenticateUser(email, password string) (bool, error) {
	var c int
	err := dal.db.Get(&c, "SELECT COUNT(1) FROM userdata WHERE email = $1 AND password = $2", email, password)
	if err != nil {
		return false, err
	}

	return c == 1, nil
}

// GetRequests get all of the requests of a certain user
func (dal *UserDAL) GetRequests(userid int) ([]*models.Request, error) {
	requests := make([]*models.Request, 0)
	rows, err := dal.db.Query("select * from request where id = $1", userid)

	for rows.Next() {
		request := new(models.Request)
		println(request)
		if err := rows.Scan(&request.ID, &request.Name, &request.Description, &request.Price, &request.Userid, request.Categoryid); err != nil {
			panic(err)
		}
		requests = append(requests, request)
	}
	return requests, err
}
