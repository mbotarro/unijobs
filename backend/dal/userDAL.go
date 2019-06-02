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
