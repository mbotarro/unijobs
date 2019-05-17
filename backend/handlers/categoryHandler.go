package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/mbotarro/unijobs/backend/models"
)

func createCategoryHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	log.Println(string(body))
	var categorydata models.Category
	err = json.Unmarshal(body, &categorydata)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "You've requested the category: %s\n", categorydata.Name)
}
