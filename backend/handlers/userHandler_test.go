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
	"github.com/mbotarro/unijobs/backend/usecases"
	"gotest.tools/assert"

	"github.com/mbotarro/unijobs/backend/tools"
)

func TestGetUserRequests(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	ctrl := usecases.NewController(db)
	router := handlers.NewRouter(ctrl)

	t.Run("Get no request", func(t *testing.T) {
		ureq, err := http.NewRequest("GET", "/users/1/requests?size=1", nil)
		if err != nil {
			t.Fatal(err)
		}

		urr := httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		if status := urr.Code; status != http.StatusOK {
			t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
		}

		expected := `{"requests":[],"last":0}`

		if urr.Body.String() != expected {
			t.Errorf("Handler returned unexpected body: got %v want %v",
				urr.Body.String(), expected)
		}
	})

	// Populate the database with some fake requests
	// User1
	u1 := tools.CreateFakeUser(t, db, "user1", "user1@user.com", "1111", "1111-1111")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	reqs1 := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u1.Userid, c1.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Álgebra Linear", "", u1.Userid, c1.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo III", "", u1.Userid, c1.ID, time.Now().Add(-22*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo IV", "", u1.Userid, c1.ID, time.Now().Add(-21*time.Hour)),
	}

	u2 := tools.CreateFakeUser(t, db, "user2", "user2@user.com", "2222", "2222-2222")
	c2 := tools.CreateFakeCategory(t, db, "Aula Física", "Física")

	reqs2 := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Física I", "", u2.Userid, c2.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Física II", "", u2.Userid, c2.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Física III", "", u2.Userid, c2.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Física IV", "", u2.Userid, c2.ID, time.Now().Add(-22*time.Hour)),
	}

	t.Run("Scroll 1 request at time", func(t *testing.T) {
		// User1 First Request
		ureq, err := http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1", u1.Userid), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr := httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected := handlers.RequestResponse{
			Requests: []models.Request{reqs1[4]},
			Last:     reqs1[4].Timestamp.Unix(),
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User1 Second Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1&before=%d", u1.Userid, reqs1[4].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs1[3]},
			Last:     reqs1[3].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User1 Third Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1&before=%d", u1.Userid, reqs1[3].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs1[2]},
			Last:     reqs1[2].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User1 Fourth Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1&before=%d", u1.Userid, reqs1[2].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs1[1]},
			Last:     reqs1[1].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User1 Fifth Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1&before=%d", u1.Userid, reqs1[1].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs1[0]},
			Last:     reqs1[0].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User2 First Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1", u2.Userid), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs2[3]},
			Last:     reqs2[3].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User2 Second Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1&before=%d", u2.Userid, reqs2[3].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs2[2]},
			Last:     reqs2[2].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User2 Third Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1&before=%d", u2.Userid, reqs2[2].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs2[1]},
			Last:     reqs2[1].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User2 Fourth Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=1&before=%d", u2.Userid, reqs2[1].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs2[0]},
			Last:     reqs2[0].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())
	})

	t.Run("3 requests at time", func(t *testing.T) {
		// User1 First Request
		ureq, err := http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=3", u1.Userid), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr := httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected := handlers.RequestResponse{
			Requests: []models.Request{reqs1[4], reqs1[3], reqs1[2]},
			Last:     reqs1[2].Timestamp.Unix(),
		}
		expectedJs, err := json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User1 Second Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=3&before=%d", u1.Userid, reqs1[2].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs1[1], reqs1[0]},
			Last:     reqs1[0].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User2 First Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=3", u2.Userid), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs2[3], reqs2[2], reqs2[1]},
			Last:     reqs2[1].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())

		// User2 Second Request
		ureq, err = http.NewRequest("GET", fmt.Sprintf("/users/%d/requests?size=3&before=%d", u2.Userid, reqs2[1].Timestamp.Unix()), nil)
		if err != nil {
			t.Fatal(err)
		}
		urr = httptest.NewRecorder()

		router.ServeHTTP(urr, ureq)

		expected = handlers.RequestResponse{
			Requests: []models.Request{reqs2[0]},
			Last:     reqs2[0].Timestamp.Unix(),
		}
		expectedJs, err = json.Marshal(expected)
		assert.Equal(t, nil, err)

		assert.Equal(t, string(expectedJs), urr.Body.String())
	})
}
