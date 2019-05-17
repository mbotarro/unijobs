package main

import (
	"log"
	"net/http"
	"time"

	"github.com/mbotarro/unijobs/backend/handlers"
)

func main() {
	r := handlers.NewRouter()

	srv := &http.Server{
		Handler: r,
		Addr:    "127.0.0.1:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
