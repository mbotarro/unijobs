package usecases

import (
	"time"

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
// It also returns the user id if he's a valid user
func (uc *UserController) AuthenticateUser(email, password string) (bool, int, error) {
	return uc.userDAL.AuthenticateUser(email, password)
}

// GetUserInfo gets all the information about an user given his/her id
func (uc *UserController) GetUserInfo(id int) (models.User, error) {
	return uc.userDAL.GetUserInfo(id)
}

// GetUserRequests get all requests created by a user
// The before parameter is used for pagination. Only the requests created before the time passed by before are returned.
// size limits the number of fetched requests
func (uc *UserController) GetUserRequests(id int, before time.Time, size int) ([]models.Request, error) {
	return uc.userDAL.GetUserRequests(id, before, size)
}

// GetUserOffers get all offers created by a user
// The before parameter is used for pagination. Only the offers created before the time passed by before are returned.
// size limits the number of fetched offers
func (uc *UserController) GetUserOffers(id int, before time.Time, size int) ([]models.Offer, error) {
	return uc.userDAL.GetUserOffers(id, before, size)
}
