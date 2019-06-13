package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/mbotarro/unijobs/backend/models"
)

// OfferResponse contains the respons sent to the frontend
type OfferResponse struct {
	Offers []models.Offer `json:"offers"`

	// Last is the timestamp of the last request sent to the front. It can be used to get the offers created before it
	Last int64 `json:"last"`
}

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
