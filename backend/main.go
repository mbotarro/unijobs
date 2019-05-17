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
		Addr:    "0.0.0.0:8080",
		// Server Timeouts!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
