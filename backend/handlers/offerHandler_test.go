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

func TestGetLastOffer(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	ctrl := usecases.NewController(db, es)
	rh := handlers.NewOfferHandler(ctrl.Offer)

	handler := http.HandlerFunc(rh.GetLastOffers)

	t.Run("get no offer", func(t *testing.T) {
		off, err := http.NewRequest("GET", "/offers?size=1", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()

		handler.ServeHTTP(rr, off)

		if status := rr.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)

		}

		expected := `{"offers":[],"last":0}`
		if rr.Body.String() != expected {
			t.Errorf("handler returned unexpected body: got %v want %v",
				rr.Body.String(), expected)
		}
	})

	// Populate the database with some fake offers
	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	offs := []models.Offer{
		tools.CreateFakeOffer(t, db, "Aula Cálculo I", "", u.Userid, c.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo II", "", u.Userid, c.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Álgebra Linear", "", u.Userid, c.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo III", "", u.Userid, c.ID, time.Now().Add(-22*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo IV", "", u.Userid, c.ID, time.Now().Add(-21*time.Hour)),
	}

	t.Run("Scroll 1 offer at time", func(t *testing.T) {
		// First Request
		off, err := http.NewRequest("GET", "/offers?size=1", nil)
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()

		handler.ServeHTTP(rr, off)

		expected := handlers.OfferResponse{
			Offers: []models.Offer{offs[4]},
			Last:   offs[4].Timestamp.Unix(),
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Second Request
		off, err = http.NewRequest("GET", fmt.Sprintf("/offers?size=1&before=%d", offs[4].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, off)

		expected = handlers.OfferResponse{
			Offers: []models.Offer{offs[3]},
			Last:   offs[3].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Third Request
		off, err = http.NewRequest("GET", fmt.Sprintf("/offers?size=1&before=%d", offs[3].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, off)

		expected = handlers.OfferResponse{
			Offers: []models.Offer{offs[2]},
			Last:   offs[2].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Fourth Request
		off, err = http.NewRequest("GET", fmt.Sprintf("/offers?size=1&before=%d", offs[2].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, off)

		expected = handlers.OfferResponse{
			Offers: []models.Offer{offs[1]},
			Last:   offs[1].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Fifth Request
		off, err = http.NewRequest("GET", fmt.Sprintf("/offers?size=1&before=%d", offs[1].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, off)

		expected = handlers.OfferResponse{
			Offers: []models.Offer{offs[0]},
			Last:   offs[0].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())
	})

	t.Run("3 offers at time", func(t *testing.T) {
		// First Request
		off, err := http.NewRequest("GET", "/offers?size=3", nil)
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()

		handler.ServeHTTP(rr, off)

		expected := handlers.OfferResponse{
			Offers: []models.Offer{offs[4], offs[3], offs[2]},
			Last:   offs[2].Timestamp.Unix(),
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

		// Second Request
		off, err = http.NewRequest("GET", fmt.Sprintf("/offers?size=3&before=%d", offs[2].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr = httptest.NewRecorder()

		handler.ServeHTTP(rr, off)

		expected = handlers.OfferResponse{
			Offers: []models.Offer{offs[1], offs[0]},
			Last:   offs[0].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())
	})
}

func TestInsertOffer(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	ctrl := usecases.NewController(db, es)
	rh := handlers.NewOfferHandler(ctrl.Offer)

	// Creates fake user and category to be used at the offer
	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	handler := http.HandlerFunc(rh.InsertOffer)

	jsonStr := fmt.Sprintf(`{
								"name": "Aula de Teste", 
								"description": "Teste de Insercao",
								"extraInfo": "Info extra",
								"maxPrice": 50,
								"minPrice": 0,
								"expiration": "2008-09-15T15:53:00+05:00",
								"userid": %d,
								"categoryid": %d,
								"telephone": true,
								"email": false
								}`, u.Userid, c.ID)
	jsonOff := []byte(jsonStr)

	req, err := http.NewRequest("POST", "/offers", bytes.NewBuffer(jsonOff))
	assert.Equal(t, nil, err)
	req.Header.Set("Content-Type", "application/json")

	reqRecord := httptest.NewRecorder()
	handler.ServeHTTP(reqRecord, req)

	status := reqRecord.Code
	assert.Equal(t, 201, status)

}
