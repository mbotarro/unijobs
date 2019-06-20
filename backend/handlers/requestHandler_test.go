package handlers_test

import (
	"bytes"
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
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	ctrl := usecases.NewController(db, es)
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

func TestInsertRequest(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	ctrl := usecases.NewController(db, es)
	rh := handlers.NewRequestHandler(ctrl.Request)

	// Creates fake user and category to be used at the request
	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	handler := http.HandlerFunc(rh.InsertRequest)

	jsonStr := fmt.Sprintf(`{
								"name": "Aula de Teste", 
								"description": "Teste de Insercao",
								"extraInfo": "Info extra",
								"maxPrice": 50,
								"minPrice": 0,
								"userid": %d,
								"categoryid": %d}`, u.Userid, c.ID)
	jsonReq := []byte(jsonStr)

	req, err := http.NewRequest("POST", "/requests", bytes.NewBuffer(jsonReq))
	assert.Equal(t, nil, err)
	req.Header.Set("Content-Type", "application/json")

	reqRecord := httptest.NewRecorder()
	handler.ServeHTTP(reqRecord, req)

	status := reqRecord.Code
	assert.Equal(t, 201, status)
}

func TestSearchRequest(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	ctrl := usecases.NewController(db, es)
	rh := handlers.NewRequestHandler(ctrl.Request)

	handler := http.HandlerFunc(rh.SearchRequests)

	// Fake Data
	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Computação", "Ciência de Computação")

	req1 := tools.CreateFakeRequest(t, db, "Aula de Cálculo I", "Procuro aula particular", u.Userid, c1.ID, time.Now().Add(-10*time.Hour))
	req2 := tools.CreateFakeRequest(t, db, "Aula de Cálculo II", "Tenho prova semana que vem", u.Userid, c1.ID, time.Now().Add(-9*time.Hour))
	req3 := tools.CreateFakeRequest(t, db, "Aula de Cálculo III", "Teorema de Green", u.Userid, c1.ID, time.Now().Add(-8*time.Hour))
	req4 := tools.CreateFakeRequest(t, db, "Álgebra Linear", "Preciso de ajuda para prova", u.Userid, c1.ID, time.Now().Add(-9*time.Hour))
	req5 := tools.CreateFakeRequest(t, db, "Aula de ICC I", "Ajuda para estudar para prova", u.Userid, c2.ID, time.Now().Add(-8*time.Hour))
	req6 := tools.CreateFakeRequest(t, db, "Aula de ICC II", "Ajuda em prova", u.Userid, c2.ID, time.Now().Add(-7*time.Hour))

	// Insert requests in ES
	for _, req := range []models.Request{req1, req2, req3, req4, req5, req6} {
		err := ctrl.Request.InsertRequestInES(req)
		assert.Equal(t, nil, err)
	}

	t.Run("get only Calculus requests", func(t *testing.T) {
		req, err := http.NewRequest("GET", "/requests?q=calculo", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		if status := rr.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)

		}

		expected := handlers.RequestResponse{
			Requests: []models.Request{req3, req2, req1}, // In creation descending order
			Last:     0,                                  // Search doesn't have pagination
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())
	})

	t.Run("get request from 2 categories", func(t *testing.T) {
		t.Run("not specifying the categories", func(t *testing.T) {
			req, err := http.NewRequest("GET", "/requests?q=prova", nil)
			if err != nil {
				t.Fatal(err)
			}

			rr := httptest.NewRecorder()

			handler.ServeHTTP(rr, req)

			if status := rr.Code; status != http.StatusOK {
				t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)

			}

			expected := handlers.RequestResponse{
				Requests: []models.Request{req6, req5, req4, req2}, // In creation descending order
				Last:     0,                                        // Search doesn't have pagination
			}
			expectedJs, err := json.Marshal(expected)
			assert.Equal(t, nil, err)

			assert.Equal(t, string(expectedJs), rr.Body.String())
		})

		t.Run("specifying both categories", func(t *testing.T) {
			req, err := http.NewRequest("GET", fmt.Sprintf("/requests?q=prova&cat=%d,%d", c1.ID, c2.ID), nil)
			if err != nil {
				t.Fatal(err)
			}

			rr := httptest.NewRecorder()

			handler.ServeHTTP(rr, req)

			if status := rr.Code; status != http.StatusOK {
				t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)

			}

			expected := handlers.RequestResponse{
				Requests: []models.Request{req6, req5, req4, req2}, // In creation descending order
				Last:     0,                                        // Search doesn't have pagination
			}
			expectedJs, err := json.Marshal(expected)
			assert.Equal(t, nil, err)

			assert.Equal(t, string(expectedJs), rr.Body.String())
		})

		t.Run("just one category", func(t *testing.T) {
			req, err := http.NewRequest("GET", fmt.Sprintf("/requests?q=prova&cat=%d", c2.ID), nil)
			if err != nil {
				t.Fatal(err)
			}

			rr := httptest.NewRecorder()

			handler.ServeHTTP(rr, req)

			if status := rr.Code; status != http.StatusOK {
				t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)

			}

			expected := handlers.RequestResponse{
				Requests: []models.Request{req6, req5}, // In creation descending order
				Last:     0,                            // Search doesn't have pagination
			}
			expectedJs, err := json.Marshal(expected)
			assert.Equal(t, nil, err)

			assert.Equal(t, string(expectedJs), rr.Body.String())
		})
	})

	t.Run("No matched request", func(t *testing.T) {
		req, err := http.NewRequest("GET", "/requests?q=eps", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		if status := rr.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)

		}

		expected := handlers.RequestResponse{
			Requests: []models.Request{}, // We expect to get no request
			Last:     0,                  // Search doesn't have pagination
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())
	})

}
