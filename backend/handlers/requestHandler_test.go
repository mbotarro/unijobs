package handlers_test

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/mbotarro/unijobs/backend/handlers"
	"github.com/mbotarro/unijobs/backend/models"
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
	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	reqs := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u.Userid, c.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u.Userid, c.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Álgebra Linear", "", u.Userid, c.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo III", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeRequest(t, db, "Aula Cálculo IV", "", u.Userid, c.ID, time.Now()),
	}

	fmt.Println(reqs)
}
