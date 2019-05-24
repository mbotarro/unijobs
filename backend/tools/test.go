package tools

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

// GetTestDB returns a connection to a DB used for test
func GetTestDB() *sqlx.DB {
	db, err := sqlx.Connect("postgres", "user=postgres dbname=unijobs sslmode=disable host=localhost port=5432")
	if err != nil {
		log.Panicf("Can't connect to the db")
	}

	// TODO: init DB test tables

	return db
}

// CleanDB delete all rows from all DB tables
func CleanDB(db *sqlx.DB) {
	db.Exec("DELETE FROM userdata")
	db.Exec("DELETE FROM offer")
	db.Exec("DELETE FROM interest")
	db.Exec("DELETE FROM category")
}
