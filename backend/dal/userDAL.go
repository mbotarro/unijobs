package dal

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
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
