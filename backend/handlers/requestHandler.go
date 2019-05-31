package handlers

import (
	"fmt"
	"net/http"
	"time"

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

func (handler *RequestHandler) getLastRequests(w http.ResponseWriter, r *http.Request) {
	reqs, err := handler.requestController.GetLastRequests(time.Now(), 30)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	tools.WriteStructOnHTTPResponse(reqs, w)
}
