package dal_test

import (
	"testing"

	"gotest.tools/assert"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
)

const (
	insertUser = `INSERT INTO userdata (username, password, email, address, telephone, student) VALUES ($1, $2, $3, $4, $5, $6)`
	getUser    = `SELECT * FROM userdata WHERE email = $1`
)

func getUserDAL(db *sqlx.DB) *dal.UserDAL {
	return dal.NewUserDAL(db)
}

func CreateFakeUser(t *testing.T, db *sqlx.DB, name, email, password string) *models.User {
	u := models.User{
		Username:  name,
		Password:  password,
		Email:     email,
		Address:   "USP SC",
		Telephone: "(11)98765-12345",
		Student:   true,
	}

	db.MustExec(insertUser, u.Username, u.Password, u.Email, u.Address, u.Telephone, u.Student)
	gotU := models.User{}
	err := db.Get(&gotU, getUser, u.Email)
	assert.Equal(t, err, nil)

	return &gotU
}

func TestAuthenticateInvalidUser(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	userDAL := getUserDAL(db)

	// We should authenticate a valid user
	valid, err := userDAL.AuthenticateUser("falseuser@falseprovider.com", "false_password")
	assert.Equal(t, nil, err)
	assert.Equal(t, false, valid)
}

func TestAuthenticateValidUser(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	userDAL := getUserDAL(db)

	// We should not authenticate a valid user
	name := "user"
	email := "user@user.com"
	pass := "1234"

	CreateFakeUser(t, db, name, email, pass)

	valid, err := userDAL.AuthenticateUser(email, pass)
	assert.Equal(t, nil, err)
	assert.Equal(t, true, valid)
}
