package handlers_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mbotarro/unijobs/backend/handlers"
	"github.com/mbotarro/unijobs/backend/tools"
	"github.com/mbotarro/unijobs/backend/usecases"
)

func TestGetLastRequest(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	req, err := http.NewRequest("GET", "/requests?size=1", nil)
	if err != nil {
		t.Fatal(err)
	}

	ctrl := usecases.NewController(db)
	rh := handlers.NewRequestHandler(ctrl.Request)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(rh.GetLastRequests)

	t.Run("get no request", func(t *testing.T) {
		handler.ServeHTTP(rr, req)

		if status := rr.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)

		}

		expected := `{"requests":[],"last":0}`
		if rr.Body.String() != expected {
			t.Errorf("handler returned unexpected body: got %v want %v",
				rr.Body.String(), expected)
		}
	})

	// Populate the database with some fake requests
	// dal_test.CreateFakeUser()
}
