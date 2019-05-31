package dal_test

import (
	"fmt"
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
)

const (
	insertRequest = `INSERT INTO request (name, description, minprice, maxprice, userid, categoryid) VALUES ($1, $2, $3, $4, $5, $6)`
)

func getRequestDAL(db *sqlx.DB) *dal.RequestDAL {
	return dal.NewRequestDAL(db)
}

func createFakeRequest(db *sqlx.DB, name, description string, minPrice, maxPrice, user, category int) {
	i := models.Request{
		Name:        name,
		Description: description,
		MinPrice:    minPrice,
		MaxPrice:    maxPrice,
		Userid:      user,
		Categoryid:  category,
	}

	db.MustExec(insertRequest, i.Name, i.Description, i.MinPrice, i.MaxPrice, i.Userid, i.Categoryid)
}

func TestGetLastRequests(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u := createFakeUser(t, db, "user", "user@user.com", "1234")
	c := createFakeCategory(t, db, "Aula Matemática", "Matemática")
	fmt.Println("GOT CATEGORY", c)

	i1 := models.Request{
		Name:        "Aula",
		Description: "Calculo I",
		MinPrice:    20,
		MaxPrice:    30,
		Userid:      u.Userid,
		Categoryid:  c.ID,
	}
	createFakeRequest(db, i1.Name, i1.Description, i1.MinPrice, i1.MaxPrice, i1.Userid, i1.Categoryid)

	requestDAL := getRequestDAL(db)
	ints, _ := requestDAL.GetLastRequests(time.Now())
	fmt.Println("ints", ints)

	//We should not authenticate a non valid user
	// assert.Equal(t, nil, err)
	// assert.Equal(t, false, valid)
}
