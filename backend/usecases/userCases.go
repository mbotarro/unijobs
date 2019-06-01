package usecases

import (
	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
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

// GetUserInfo gets all the information about an user given his/her id
func (uc *UserController) GetUserInfo(id int) (models.User, error) {
	return uc.userDAL.GetUserInfo(id)
}
