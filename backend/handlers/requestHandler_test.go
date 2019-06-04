package handlers_test

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/mbotarro/unijobs/backend/handlers"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
	"github.com/mbotarro/unijobs/backend/usecases"
	"gotest.tools/assert"
)

func TestGetLastRequest(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	ctrl := usecases.NewController(db)
	rh := handlers.NewRequestHandler(ctrl.Request)

	handler := http.HandlerFunc(rh.GetLastRequests)

	t.Run("get no request", func(t *testing.T) {
		req, err := http.NewRequest("GET", "/requests?size=1", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()

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
	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	reqs := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u.Userid, c.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u.Userid, c.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Álgebra Linear", "", u.Userid, c.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo III", "", u.Userid, c.ID, time.Now().Add(-22*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo IV", "", u.Userid, c.ID, time.Now().Add(-21*time.Hour)),
	}

	t.Run("Scroll 1 request at time", func(t *testing.T) {
		// First Request
		req, err := http.NewRequest("GET", "/requests?size=1", nil)
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		expected := handlers.RequestResponse{
			Requests: []models.Request{reqs[4]},
			Last:     reqs[4].Timestamp.Unix(),
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Second Request
		req, err = http.NewRequest("GET", fmt.Sprintf("/requests?size=1&before=%d", reqs[4].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs[3]},
			Last:     reqs[3].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Third Request
		req, err = http.NewRequest("GET", fmt.Sprintf("/requests?size=1&before=%d", reqs[3].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs[2]},
			Last:     reqs[2].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Fourth Request
		req, err = http.NewRequest("GET", fmt.Sprintf("/requests?size=1&before=%d", reqs[2].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs[1]},
			Last:     reqs[1].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Fifth Request
		req, err = http.NewRequest("GET", fmt.Sprintf("/requests?size=1&before=%d", reqs[1].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs[0]},
			Last:     reqs[0].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())
	})

	t.Run("3 requests at time", func(t *testing.T) {
		// First Request
		req, err := http.NewRequest("GET", "/requests?size=3", nil)
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		expected := handlers.RequestResponse{
			Requests: []models.Request{reqs[4], reqs[3], reqs[2]},
			Last:     reqs[2].Timestamp.Unix(),
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Second Request
		req, err = http.NewRequest("GET", fmt.Sprintf("/requests?size=3&before=%d", reqs[2].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs[1], reqs[0]},
			Last:     reqs[0].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())
	})
}
