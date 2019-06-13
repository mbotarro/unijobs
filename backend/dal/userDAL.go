package dal

import (
	"time"

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
// It also returns the user id if he's a valid user
func (dal *UserDAL) AuthenticateUser(email, password string) (bool, int, error) {
	var c int
	err := dal.db.Get(&c, "SELECT COUNT(1) FROM userdata WHERE email = $1 AND password = $2", email, password)
	if err != nil {
		return false, -1, err
	}

	if c != 1 {
		return false, -1, nil
	}

	var id int
	err = dal.db.Get(&id,
		`SELECT userid FROM userdata WHERE email = $1 AND password = $2`, email, password)
	if err != nil {
		return false, -1, err
	}

	return true, id, nil
}

// GetUserInfo returns information about an user given his/her ID
func (dal *UserDAL) GetUserInfo(id int) (models.User, error) {
	var u models.User
	err := dal.db.Get(&u, "SELECT * FROM userdata WHERE userid = $1", id)
	if err != nil {
		return models.User{}, err
	}

	return u, nil
}

// GetUserRequests get all requests created by a user
// The before parameter is used for pagination. Only the requests created before the time passed by before are returned.
// size limits the number of fetched requests
func (dal *UserDAL) GetUserRequests(id int, before time.Time, size int) ([]models.Request, error) {
	reqs := []models.Request{}
	err := dal.db.Select(&reqs,
		`SELECT * FROM request WHERE userid = $1 AND timestamp < $2
			ORDER BY timestamp DESC
			LIMIT $3`, id, before.UTC(), size)
	if err != nil {
		return nil, err
	}

	return reqs, nil
}

// GetUserOffers get all offers created by a `user`
// The `before` parameter is used for pagination. Only the requests created before the time passed by before are returned.
// `size` limits the number of fetched requests
func (dal *UserDAL) GetUserOffers(id int, before time.Time, size int) ([]models.Offer, error) {
	offers := []models.Offer{}
	err := dal.db.Select(&offers,
		`SELECT * FROM offer WHERE userid = $1 AND timestamp < $2
			ORDER BY timestamp DESC
			LIMIT $3`, id, before.UTC(), size)
	if err != nil {
		return nil, err
	}

	return offers, nil
}
