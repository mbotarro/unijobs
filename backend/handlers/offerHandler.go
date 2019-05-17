package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type offer struct {
	ID         int
	Name       string
	Decription string
	Price      int
	Userid     int
	Categoryid int
}

func createOfferHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	log.Println(string(body))
	var offerdata offer
	err = json.Unmarshal(body, &offerdata)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "You've requested the offer: %s\n", offerdata.Name)
}
