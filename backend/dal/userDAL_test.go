package dal_test

import (
	"testing"

	"gotest.tools/assert"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/tools"
)

func getUserDAL(db *sqlx.DB) *dal.UserDAL {
	return dal.NewUserDAL(db)
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

	tools.CreateFakeUser(t, db, name, email, pass)

	valid, err := userDAL.AuthenticateUser(email, pass)
	assert.Equal(t, nil, err)
	assert.Equal(t, true, valid)
}
