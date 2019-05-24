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
func TestAuthenticateUser(t *testing.T) {
	db := tools.ConnectToDB()
	defer tools.CleanDB()

	userDAL := getUserDAL(db)

	// We should not authenticate a non valid user
	valid, err := userDAL.AuthenticateUser("falseuser@falseprovider.com", "false_password")
	assert.Equal(t, nil, err)
	assert.Equal(t, false, valid)
}
