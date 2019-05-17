package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type user struct {
	username      string
	password      string
	email         string
	address       string
	telephone     string
	userid        int
	universitario bool
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20)
	decoder := json.NewDecoder(r.Body)

	var userdata user
	err := decoder.Decode(&userdata)
	if err != nil {
		panic(err)
	}
	log.Println(userdata.username)

	fmt.Fprintf(w, "You've requested the user: %s\n", userdata.username)
}
