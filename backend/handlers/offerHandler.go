package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

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

// OfferInsertion contains the expected input from the frontend
type OfferInsertion struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ExtraInfo   string `json:"extrainfo"`
	MaxPrice    int    `json:"maxprice"`
	MinPrice    int    `json:"minprice"`
	Userid      int    `json:"userid"`
	Categoryid  int    `json:"categoryid"`
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
