package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/mbotarro/unijobs/backend/models"
)

func createOfferHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	log.Println(string(body))
	var offerdata models.Offer
	err = json.Unmarshal(body, &offerdata)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "You've requested the offer: %s\n", offerdata.Name)
}
