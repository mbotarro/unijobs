package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/mbotarro/unijobs/backend/models"
)

func createInterestHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	log.Println(string(body))
	var interestdata models.Interest
	err = json.Unmarshal(body, &interestdata)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "You've requested the interest: %s\n", interestdata.Name)
}
