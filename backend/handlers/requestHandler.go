package handlers

import (
	"fmt"
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

func (handler *RequestHandler) getLastRequests(w http.ResponseWriter, r *http.Request) {
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
