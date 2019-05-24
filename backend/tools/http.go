package tools

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/mbotarro/unijobs/backend/errors"
)

// WriteStructOnHTTPResponse marhsal the given struct as a JSON and write it in the response body
func WriteStructOnHTTPResponse(data interface{}, w http.ResponseWriter) {
	js, err := json.Marshal(data)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.JSONMarshalError, err.Error()).Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
