package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"

	"github.com/mbotarro/unijobs/backend/usecases"
)

// OfferHandler handle all Offers' API
type OfferHandler struct {
	offerController *usecases.OfferController
}

// NewOfferHandler returns a new OfferHandler
func NewOfferHandler(offerCtrl *usecases.OfferController) *OfferHandler {
	return &OfferHandler{
		offerController: offerCtrl,
	}
}

// OfferResponse contains the response sent to the frontend
type OfferResponse struct {
	Offers []models.Offer `json:"offers"`

	// Last is the timestamp of the last offer sent to the front. It can be used to get the offers created before it
	Last int64 `json:"last"`
}

// HistoryOfferResponse contains the response sent to the frontend with information of the users that matched the offer
type HistoryOfferResponse struct {
	HistoryOffers []models.HistoryOffer `json:"offers"`
	// Last is the timestamp of the last offer sent to the front. It can be used to get the offers created before it
	Last int64 `json:"last"`
}
// MatchedOfferResponse contains the response sent to the frontend
type MatchedOfferResponse struct {
	MatchedOffers []models.MatchedOffer `json:"offers"`
	// Last is the timestamp of the last offer sent to the front. It can be used to get the offers created before it
	Last int64 `json:"last"`
}

// OfferInsertion contains the expected input from the frontend
type OfferInsertion struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	ExtraInfo   string    `json:"extrainfo"`
	MaxPrice    int       `json:"maxprice"`
	MinPrice    int       `json:"minprice"`
	Expiration  time.Time `json:"expiration"`
	Userid      int       `json:"userid"`
	Categoryid  int       `json:"categoryid"`
	Telephone   bool      `db:"telephone" json:"telephone"`
	Email       bool      `db:"email" json:"email"`
}

// GetLastOffers sends the last offers created in the unijobs service
func (handler *OfferHandler) GetLastOffers(w http.ResponseWriter, r *http.Request) {
	sizeStr := r.FormValue("size")
	size, err := strconv.ParseInt(sizeStr, 10, 32)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
		return
	}

	before := time.Now()
	beforeStr := r.FormValue("before")
	if beforeStr != "" {
		beforeInt, err := strconv.ParseInt(beforeStr, 10, 64)
		if err != nil {
			http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
			return
		}

		before = time.Unix(beforeInt, 0)
	}

	offers, err := handler.offerController.GetLastOffers(before, int(size))
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	reqRes := OfferResponse{
		Offers: offers,
	}

	if l := len(offers); l > 0 {
		reqRes.Last = offers[l-1].Timestamp.Unix()
	}

	tools.WriteStructOnHTTPResponse(reqRes, w)
}

// InsertOffer is a function that receives a post request with some parameters and calls the function to insert it in the database
// The offer is sent as a json file. It's fields are given in Models.Offer
func (handler *OfferHandler) InsertOffer(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.ReadRequestBodyError, err.Error()).Error(), http.StatusBadRequest)
		return
	}

	var offInserted OfferInsertion
	err = json.Unmarshal(body, &offInserted)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.JSONUnmarshalError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	// Passes the received data into a offer for it to be inserted
	var off models.Offer

	off.Name = offInserted.Name
	off.Description = offInserted.Description
	off.ExtraInfo = offInserted.ExtraInfo
	off.MaxPrice = offInserted.MaxPrice
	off.MinPrice = offInserted.MinPrice
	off.Userid = offInserted.Userid
	off.Categoryid = offInserted.Categoryid
	off.Timestamp = time.Now()

	_, err = handler.offerController.InsertOffer(off, offInserted.Telephone, offInserted.Email)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

// SearchOffers searches for Offers based on a query sent by the user
// The results can be filtered by one or more by categories ids
func (handler *OfferHandler) SearchOffers(w http.ResponseWriter, r *http.Request) {
	// Query
	query := r.FormValue("q")

	// Categories ID. The frontend sends them separed by , . We should split them
	catStr := r.FormValue("cat")

	// We should convert categories ID to int
	categoryIDs := make([]int, 0, len(catStr))

	if catStr != "" { // If the user wants to filter the results by category
		for _, cat := range strings.Split(catStr, ",") {
			id, err := strconv.ParseInt(cat, 10, 32)
			if err != nil {
				http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
				return
			}

			categoryIDs = append(categoryIDs, int(id))
		}
	}

	offs, err := handler.offerController.SearchOffers(query, categoryIDs...)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	offRes := OfferResponse{
		Offers: offs,
	}

	tools.WriteStructOnHTTPResponse(offRes, w)
}

// InsertOfferMatch inserts the match of a given user with an offer, it receives a json with the offer id
func (handler *OfferHandler) InsertOfferMatch(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	// Gets offer id
	offerid := vars["offerid"]
	// Gets user id
	idStr := vars["userid"]

	uid64, err := strconv.ParseInt(idStr, 10, 32)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
		return
	}
	userid := int(uid64)

	err = handler.offerController.InsertOfferMatch(userid, offerid)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// GetMatchedFeed sends the last offers created in the unijobs service
func (handler *OfferHandler) GetMatchedFeed(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	// Gets userid
	idStr := vars["userid"]
	uid64, err := strconv.ParseInt(idStr, 10, 32)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
		return
	}
	userid := int(uid64)

	sizeStr := r.FormValue("size")
	size, err := strconv.ParseInt(sizeStr, 10, 32)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
		return
	}

	before := time.Now()
	beforeStr := r.FormValue("before")
	if beforeStr != "" {
		beforeInt, err := strconv.ParseInt(beforeStr, 10, 64)
		if err != nil {
			http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
			return
		}

		before = time.Unix(beforeInt, 0)
	}

	offers, err := handler.offerController.GetMatchOffers(before, int(size), userid)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}
	reqRes := MatchedOfferResponse{
		MatchedOffers: offers,
	}

	if l := len(offers); l > 0 {
		reqRes.Last = offers[l-1].Timestamp.Unix()
	}

	tools.WriteStructOnHTTPResponse(reqRes, w)
}
