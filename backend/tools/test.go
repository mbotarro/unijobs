package tools

import (
	"log"
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/mbotarro/unijobs/backend/models"
	"gotest.tools/assert"
)

// GetTestDB returns a connection to a DB used for test
func GetTestDB() *sqlx.DB {
	db, err := sqlx.Connect("postgres", "user=postgres dbname=unijobs_test sslmode=disable host=localhost port=5432")
	if err != nil {
		log.Panicf("Can't connect to the db")
	}

	return db
}

// CleanDB delete all rows from all DB tables
func CleanDB(db *sqlx.DB) {
	db.MustExec("DELETE FROM request")
	db.MustExec("DELETE FROM offer")
	db.MustExec("DELETE FROM category")
	db.MustExec("DELETE FROM userdata")
}

// Mock data creation

const (
	insertUser     = `INSERT INTO userdata (username, password, email, address, telephone, student) VALUES ($1, $2, $3, $4, $5, $6)`
	getUser        = `SELECT * FROM userdata WHERE email = $1`
	insertCategory = `INSERT INTO category (name, description) VALUES ($1, $2)`
	getCategory    = `SELECT * FROM category WHERE name = $1`
	insertRequest  = `INSERT INTO request (name, description, extrainfo, minprice, maxprice, userid, categoryid, timestamp) 
						VALUES ($1, $2, '', $3, $4, $5, $6, $7)`
	getRequest = `SELECT * FROM request WHERE (name, description, userid, categoryid) = ($1, $2, $3, $4)`
)

// CreateFakeUser inserts a fake user in the db
func CreateFakeUser(t *testing.T, db *sqlx.DB, name, email, password string) *models.User {
	u := models.User{
		Username:  name,
		Password:  password,
		Email:     email,
		Address:   "USP SC",
		Telephone: "(11)98765-12345",
		Student:   true,
	}

	db.MustExec(insertUser, u.Username, u.Password, u.Email, u.Address, u.Telephone, u.Student)
	gotU := models.User{}
	err := db.Get(&gotU, getUser, u.Email)
	assert.Equal(t, err, nil)

	return &gotU
}

// CreateFakeCategory inserts a fake category in the db
func CreateFakeCategory(t *testing.T, db *sqlx.DB, name, description string) *models.Category {
	c := models.Category{}

	db.MustExec(insertCategory, name, description)

	err := db.Get(&c, getCategory, name)
	assert.Equal(t, err, nil)

	return &c
}

// CreateFakeRequest creates a fake request in the db
func CreateFakeRequest(t *testing.T, db *sqlx.DB, name, description string, user, category int, timestamp time.Time) models.Request {
	db.MustExec(insertRequest, name, description, 20, 30, user, category, timestamp.UTC())

	r := models.Request{}
	err := db.Get(&r, getRequest, name, description, user, category)
	assert.Equal(t, nil, err)

	return r

}
