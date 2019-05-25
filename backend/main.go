package main

import (
	"log"
	"net/http"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/mbotarro/unijobs/backend/handlers"
	"github.com/mbotarro/unijobs/backend/usecases"
)

func main() {

	// Should import a driver to interact with the db: _ "github.com/lib/pq"
	db, err := sqlx.Connect("postgres", "user=postgres dbname=unijobs sslmode=disable")
	if err != nil {
		log.Panicf("Can't connect to the db")
	}

	ctrl := usecases.NewController(db)

	r := handlers.NewRouter(ctrl)

	srv := &http.Server{
		Handler: r,
		Addr:    "0.0.0.0:8080",
		// Server Timeouts!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
