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
	insertUser = `INSERT INTO userdata (username, password, email, address, telephone, universitario) VALUES ($1, $2, $3, $4, $5, $6)`
)

func getUserDAL(db *sqlx.DB) *dal.UserDAL {
	return dal.NewUserDAL(db)
}

func createFakeUser(db *sqlx.DB, name, email, password string) {
	u := models.User{
		Username:      name,
		Password:      password,
		Email:         email,
		Address:       "USP SC",
		Telephone:     "(11)98765-12345",
		Universitario: true,
	}

	db.MustExec(insertUser, u.Username, u.Password, u.Email, u.Address, u.Telephone, u.Universitario)
}

func TestAuthenticateValidUser(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	userDAL := getUserDAL(db)

	// We should authenticate a valid user
	valid, err := userDAL.AuthenticateUser("falseuser@falseprovider.com", "false_password")
	assert.Equal(t, nil, err)
	assert.Equal(t, false, valid)
}

func TestAuthenticateInvalidUser(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	userDAL := getUserDAL(db)

	// We should not authenticate a valid user
	name := "user"
	email := "user@user.com"
	pass := "1234"

	createFakeUser(db, name, email, pass)
	valid, err := userDAL.AuthenticateUser(email, pass)
	assert.Equal(t, nil, err)
	assert.Equal(t, true, valid)
}
