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

const (
	insertRequest = `INSERT INTO request (name, description, extrainfo, minprice, maxprice, userid, categoryid, timestamp) 
						VALUES ($1, $2, '', $3, $4, $5, $6, $7)`
	getRequest = `SELECT * FROM request WHERE (name, description, userid, categoryid) = ($1, $2, $3, $4)`
)

func getRequestDAL(db *sqlx.DB) *dal.RequestDAL {
	return dal.NewRequestDAL(db)
}

func createFakeRequest(t *testing.T, db *sqlx.DB, name, description string, user, category int, timestamp time.Time) models.Request {
	db.MustExec(insertRequest, name, description, 20, 30, user, category, timestamp)

	r := models.Request{}
	err := db.Get(&r, getRequest, name, description, user, category)
	assert.Equal(t, nil, err)

	return r

}
func TestGetLastRequests(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u := createFakeUser(t, db, "user", "user@user.com", "1234")
	c := createFakeCategory(t, db, "Aula Matemática", "Matemática")

	reqs := []models.Request{
		createFakeRequest(t, db, "Aula Cálculo I", "", u.Userid, c.ID, time.Now()),
		createFakeRequest(t, db, "Aula Cálculo II", "", u.Userid, c.ID, time.Now()),
		createFakeRequest(t, db, "Aula Cálculo III", "", u.Userid, c.ID, time.Now()),
	}

	requestDAL := getRequestDAL(db)
	gotReqs, err := requestDAL.GetLastRequests(time.Now())
	assert.Equal(t, nil, err)

	for i, req := range gotReqs {
		assert.Equal(t, reqs[len(reqs)-i-1], req)
	}
}
