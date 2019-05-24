package tools

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func ConnectToDB() *sqlx.DB {
	db, err := sqlx.Connect("postgres", "user=postgres dbname=unijobs sslmode=disable")
	if err != nil {
		log.Panicf("Can't connect to the db")
	}

	// TODO: init DB test tables

	return db
}

func CleanDB() {
	// TODO: clear all DB tables
}
