package tools

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
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
	db.MustExec("DELETE FROM userdata")
	db.MustExec("DELETE FROM offer")
	db.MustExec("DELETE FROM interest")
	db.MustExec("DELETE FROM category")
}
