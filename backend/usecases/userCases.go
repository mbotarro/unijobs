package usecases

import (
	"github.com/mbotarro/unijobs/backend/dal"
)

type UserController struct {
	userDAL *dal.UserDAL
}

func NewUserController() *UserController{	
	return &UserController{
		userDAL: &dal.UserDAL{},
	}
}

func (uc *UserController) AuthenticateUser() bool{
	return true; 
}
