package usecases

import (
	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
)

// UserController wraps all User usecases
type UserController struct {
	userDAL *dal.UserDAL
}

// NewUserController returns a new UserController
func NewUserController(db *sqlx.DB) *UserController {
	return &UserController{
		userDAL: dal.NewUserDAL(db),
	}
}

// AuthenticateUser returns if an user is a valid one
func (uc *UserController) AuthenticateUser(email, password string) (bool, error) {
	return uc.userDAL.AuthenticateUser(email, password)
}
