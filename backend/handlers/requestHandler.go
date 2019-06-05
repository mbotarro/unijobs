package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	"github.com/mbotarro/unijobs/backend/models"

	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/mbotarro/unijobs/backend/tools"
	"github.com/mbotarro/unijobs/backend/usecases"
)

// RequestHandler handle all Requests' API
type RequestHandler struct {
	requestController *usecases.RequestController
}

// NewRequestHandler returns a new RequestHandler
func NewRequestHandler(requestCtrl *usecases.RequestController) *RequestHandler {
	return &RequestHandler{
		requestController: requestCtrl,
	}
}

// RequestResponse contains the respons sent to the frontend
type RequestResponse struct {
	Requests []models.Request `json:"requests"`

	// Last is the timestamp of the last request sent to the front. It can be used to get the requests created before it
	Last int64 `json:"last"`
}

// RequestInsertion contains the expected input from the frontend
type RequestInsertion struct {
	Name        string `json: Name`
	Description string `json: Description`
	ExtraInfo   string `json: ExtraInfo`
	MaxPrice    int    `json: MaxPrice`
	MinPrice    int    `json: MinPrice`
	Userid      int    `json: Userid`
	Categoryid  int    `json: Categoryid`
}

// GetLastRequests sends the last requests created in the unijobs service
func (handler *RequestHandler) GetLastRequests(w http.ResponseWriter, r *http.Request) {
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

	reqs, err := handler.requestController.GetLastRequests(before, int(size))
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	reqRes := RequestResponse{
		Requests: reqs,
	}

	if l := len(reqs); l > 0 {
		reqRes.Last = reqs[l-1].Timestamp.Unix()
	}

	tools.WriteStructOnHTTPResponse(reqRes, w)
}

// InsertRequest is a function that receives a post request with some parameters and calls the function to insert it in the database
// The request is sent as a json file. It's fields are given in Models.Request
func (handler *RequestHandler) InsertRequest(w http.ResponseWriter, r *http.Request) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add working insertion handler and testing
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.ReadRequestBodyError, err.Error()).Error(), http.StatusBadRequest)
		return
	}

	var reqInserted RequestInsertion
	err = json.Unmarshal(body, &reqInserted)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.JSONUnmarshalError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	// Passes the received data into a request for it to be inserted
	var req models.Request

	req.Name = reqInserted.Name
	req.Description = reqInserted.Description
	req.ExtraInfo = reqInserted.ExtraInfo
	req.MaxPrice = reqInserted.MaxPrice
	req.MinPrice = reqInserted.MinPrice
	req.Userid = reqInserted.Userid
	req.Categoryid = reqInserted.Categoryid
	req.Timestamp = time.Now()

	err = handler.requestController.InsertRequest(req)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
}
