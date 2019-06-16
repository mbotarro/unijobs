package main

import (
	"log"
	"net/http"
	"time"
	"fmt"
	"context"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/mbotarro/unijobs/backend/handlers"
	"github.com/mbotarro/unijobs/backend/usecases"
	"github.com/olivere/elastic/v7"
)

func main() {

	// Should import a driver to interact with the db: _ "github.com/lib/pq"
	db, err := sqlx.Connect("postgres", "user=postgres dbname=unijobs sslmode=disable")
	if err != nil {
		log.Panicf("Can't connect to the db")
	}

	es, err := elastic.NewClient(
		elastic.SetURL("http://localhost:9200"),
		elastic.SetSniff(false))
	if err != nil {
		log.Panicf("Can't connect to ES %s", err.Error())
	}

	// Get ES health status for test purposes
	// TODO: delete it when actually using the client
	res, err := es.ClusterHealth().Do(context.Background())
	if err != nil {
		panic(err)
	}
	if res == nil {
		panic(err)
	}
	fmt.Printf("ES cluster status is %q\n", res.Status)

	ctrl := usecases.NewController(db, es)
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
