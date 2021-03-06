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

func TestSearchOffer(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	ctrl := usecases.NewController(db, es)
	oh := handlers.NewOfferHandler(ctrl.Offer)

	handler := http.HandlerFunc(oh.SearchOffers)

	// Fake Data
	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Computação", "Ciência de Computação")

	off1 := tools.CreateFakeOfferWithTelAndMail(t, db, "Aula de Cálculo I", "Dou aula particular", u.Userid, c1.ID, time.Now().Add(-10*time.Hour), u.Telephone, u.Email)
	off2 := tools.CreateFakeOfferWithTelAndMail(t, db, "Aula de Cálculo II", "Ajudo com provas e listas", u.Userid, c1.ID, time.Now().Add(-9*time.Hour), u.Telephone, u.Email)
	off3 := tools.CreateFakeOfferWithTelAndMail(t, db, "Aula de Cálculo III", "Mestrando no ICMC. Ajudo em estudo para provas", u.Userid, c1.ID, time.Now().Add(-8*time.Hour), u.Telephone, u.Email)
	off4 := tools.CreateFakeOfferWithTelAndMail(t, db, "Álgebra Linear", "Ajudo com listas", u.Userid, c1.ID, time.Now().Add(-7*time.Hour), u.Telephone, u.Email)
	off5 := tools.CreateFakeOfferWithTelAndMail(t, db, "Aula de ICC I", "Dou aulas particulares de C e C++", u.Userid, c2.ID, time.Now().Add(-6*time.Hour), u.Telephone, u.Email)
	off6 := tools.CreateFakeOfferWithTelAndMail(t, db, "Aula de ICC II", "Ajudo na preparação para provas", u.Userid, c2.ID, time.Now().Add(-5*time.Hour), u.Telephone, u.Email)

	// Insert offers in ES
	for _, off := range []*models.Offer{&off1, &off2, &off3, &off4, &off5, &off6} {
		id, err := ctrl.Offer.InsertOffer(*off, true, true)
		assert.Equal(t, nil, err)
		off.ID = id
	}

	t.Run("get only Calculus offers", func(t *testing.T) {
		req, err := http.NewRequest("GET", "/requests?q=calculo", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()

		handler.ServeHTTP(rr, req)

		if status := rr.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)

		}

		expected := handlers.OfferResponse{
			Offers: []models.Offer{off3, off2, off1}, // In creation descending order
			Last:   0,                                // Search doesn't have pagination
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())
	})

	t.Run("get offers from 2 categories", func(t *testing.T) {
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

			expected := handlers.OfferResponse{
				Offers: []models.Offer{off6, off3, off2}, // In creation descending order
				Last:   0,                                // Search doesn't have pagination
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

			expected := handlers.OfferResponse{
				Offers: []models.Offer{off6, off3, off2}, // In creation descending order
				Last:   0,                                // Search doesn't have pagination
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

			expected := handlers.OfferResponse{
				Offers: []models.Offer{off6}, // In creation descending order
				Last:   0,                    // Search doesn't have pagination
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

		expected := handlers.OfferResponse{
			Offers: []models.Offer{}, // We expect to get no request
			Last:   0,                // Search doesn't have pagination
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())
	})

}

func TestInsertOfferMatch(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	ctrl := usecases.NewController(db, es)

	router := handlers.NewRouter(ctrl)

	// Creates fake user and category to be used at the offer
	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	off := tools.CreateFakeOffer(t, db, "Aula de Cálculo I", "Oferecço aula particular", u.Userid, c.ID, time.Now().Add(-10*time.Hour))

	///offers/{offer-id:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}/users/{user-id:[0-9]+}

	req, err := http.NewRequest("POST", fmt.Sprintf("/offers/%s/users/%d", off.ID, u.Userid), nil)

	assert.Equal(t, nil, err)

	reqRecord := httptest.NewRecorder()
	router.ServeHTTP(reqRecord, req)

	status := reqRecord.Code
	assert.Equal(t, 201, status)
}

func TestGetMatchedFeed(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	ctrl := usecases.NewController(db, es)

	router := handlers.NewRouter(ctrl)

	// Creates fake user and category to be used at the offer
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	u := tools.CreateFakeUser(t, db, "user2", "user2@user.com", "13234", "99993-1111")
	creator := tools.CreateFakeUser(t, db, "user3", "user3@user.com", "1234", "9999-1111")
	off := tools.CreateFakeOffer(t, db, "Aula de Cálculo III", "Oferecço aula particular", creator.Userid, c.ID, time.Now().Add(-10*time.Hour))

	offs := []models.MatchedOffer{
		models.MatchedOffer{Offer: off, Matched: false},
	}

	t.Run("get no matched offer", func(t *testing.T) {
		myoff, err := http.NewRequest("GET", fmt.Sprintf("/offers/users/%d?size=1", u.Userid), nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()

		router.ServeHTTP(rr, myoff)

		if status := rr.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
		}

		expected := handlers.MatchedOfferResponse{
			MatchedOffers: []models.MatchedOffer{offs[0]},
			Last:          offs[0].Timestamp.Unix(),
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), rr.Body.String())

	})

	// Populate the database with one fake match
	tools.CreateFakeMatch(t, db, u, off)

	offs = []models.MatchedOffer{
		models.MatchedOffer{Offer: off, Matched: true},
	}

	t.Run("One offer one match", func(t *testing.T) {
		off, err := http.NewRequest("GET", fmt.Sprintf("/offers/users/%d?size=1", u.Userid), nil)
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()

		router.ServeHTTP(rr, off)

		expected := handlers.MatchedOfferResponse{
			MatchedOffers: []models.MatchedOffer{offs[0]},
			Last:          offs[0].Timestamp.Unix(),
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		//fmt.Print(rr.Body.String())
		assert.Equal(t, string(expectedJs), rr.Body.String())

	})
}
