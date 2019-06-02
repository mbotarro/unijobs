package dal_test

import (
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
	"gotest.tools/assert"
)

func getRequestDAL(db *sqlx.DB) *dal.RequestDAL {
	return dal.NewRequestDAL(db)
}

func TestGetLastRequests(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	reqs := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeRequest(t, db, "Aula Cálculo III", "", u.Userid, c.ID, time.Now()),
	}

	requestDAL := getRequestDAL(db)

	t.Run("without size limit", func(t *testing.T) {
		gotReqs, err := requestDAL.GetLastRequests(time.Now(), 30)
		assert.Equal(t, nil, err)

		assert.Equal(t, 3, len(gotReqs))
		assert.Equal(t, reqs[2], gotReqs[0])
		assert.Equal(t, reqs[1], gotReqs[1])
		assert.Equal(t, reqs[0], gotReqs[2])
	})

	t.Run("with size limit", func(t *testing.T) {
		t.Run("size 2", func(t *testing.T) {
			gotReqs, err := requestDAL.GetLastRequests(time.Now(), 2)
			assert.Equal(t, nil, err)

			assert.Equal(t, 2, len(gotReqs))
			assert.Equal(t, reqs[2], gotReqs[0])
			assert.Equal(t, reqs[1], gotReqs[1])
		})

		t.Run("size 1", func(t *testing.T) {
			gotReqs, err := requestDAL.GetLastRequests(time.Now(), 1)
			assert.Equal(t, nil, err)

			assert.Equal(t, 1, len(gotReqs))
			assert.Equal(t, reqs[2], gotReqs[0])
		})
	})

}

func TestGetLastRequestsBeforeTimestamp(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	reqs := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u.Userid, c.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u.Userid, c.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Álgebra Linear", "", u.Userid, c.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo III", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeRequest(t, db, "Aula Cálculo IV", "", u.Userid, c.ID, time.Now()),
	}

	requestDAL := getRequestDAL(db)

	t.Run("without size limit", func(t *testing.T) {
		// Get only the requests created before 1 hour ago
		gotReqs, err := requestDAL.GetLastRequests(time.Now().Add(-time.Hour), 30)
		assert.Equal(t, nil, err)

		// We should get just the first two requests, ordered by creation time
		assert.Equal(t, 3, len(gotReqs))
		assert.Equal(t, reqs[2], gotReqs[0])
		assert.Equal(t, reqs[1], gotReqs[1])
		assert.Equal(t, reqs[0], gotReqs[2])
	})

	t.Run("with size limit", func(t *testing.T) {
		t.Run("size 2", func(t *testing.T) {
			gotReqs, err := requestDAL.GetLastRequests(time.Now().Add(-time.Hour), 2)
			assert.Equal(t, nil, err)

			assert.Equal(t, 2, len(gotReqs))
			assert.Equal(t, reqs[2], gotReqs[0])
			assert.Equal(t, reqs[1], gotReqs[1])
		})

		t.Run("size 1", func(t *testing.T) {
			gotReqs, err := requestDAL.GetLastRequests(time.Now().Add(-time.Hour), 1)
			assert.Equal(t, nil, err)

			assert.Equal(t, 1, len(gotReqs))
			assert.Equal(t, reqs[2], gotReqs[0])
		})
	})
}

func TestInsertRequest(t *testing.T) {
	// Get connection to test database and cleans it
	db := tools.GetTestDB()
	defer tools.CleanDB(db)
	requestDAL := getRequestDAL(db)

	// Create the fake request
	var req models.Request
	req.Name = "Requis Aula Calc"
	req.Description = "Procuro aula de calculo"
	req.ExtraInfo = "Informacao X"
	req.MinPrice = 20
	req.MaxPrice = 50

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	req.Userid = u.Userid
	req.Categoryid = c.ID

	// Executes the test query
	err := requestDAL.InsertRequest(req)

	// Checks the expected results
	assert.Equal(t, nil, err)
}
