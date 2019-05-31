package dal_test

import (
	"fmt"
	"testing"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
)

const (
	insertInterest = `INSERT INTO interest (name, description, price, userid, categoryid) VALUES ($1, $2, $3, $4, $5)`
)

func getInterestDAL(db *sqlx.DB) *dal.InterestDAL {
	return dal.NewInterestDAL(db)
}

func createFakeInterest(db *sqlx.DB, name, description string, price, user, category int) {
	i := models.Interest{
		Name:        name,
		Description: description,
		Price:       price,
		Userid:      user,
		Categoryid:  category,
	}

	db.MustExec(insertInterest, i.Name, i.Description, i.Price, i.Userid, i.Categoryid)
}

func TestGetLastInterests(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u := createFakeUser(t, db, "user", "user@user.com", "1234")
	c := createFakeCategory(t, db, "Aula Matemática", "Matemática")
	fmt.Println("GOT CATEGORY", c)

	i1 := models.Interest{
		Name:        "Aula",
		Description: "Calculo I",
		Price:       20,
		Userid:      u.Userid,
		Categoryid:  c.ID,
	}
	createFakeInterest(db, i1.Name, i1.Description, i1.Price, i1.Userid, i1.Categoryid)

	interestDAL := getInterestDAL(db)
	ints, _ := interestDAL.GetLastInterests()
	fmt.Println("ints", ints)

	// We should not authenticate a non valid user
	// assert.Equal(t, nil, err)
	// assert.Equal(t, false, valid)
}
