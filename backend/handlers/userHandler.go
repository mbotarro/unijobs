package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type user struct {
	Username      string
	Password      string
	Email         string
	Address       string
	Telephone     string
	Userid        int
	Universitario bool
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	log.Println(string(body))
	var userdata user
	err = json.Unmarshal(body, &userdata)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "You've requested the user: %s\n", userdata.Username)
}
