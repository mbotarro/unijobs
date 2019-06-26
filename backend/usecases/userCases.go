package usecases

import (
	"time"

	"github.com/olivere/elastic/v7"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
)

// UserController wraps all User usecases
type UserController struct {
	userDAL *dal.UserDAL
	offerDAL *dal.OfferDAL
}

// NewUserController returns a new UserController
func NewUserController(db *sqlx.DB, es *elastic.Client) *UserController {
	return &UserController{
		userDAL: dal.NewUserDAL(db),
		offerDAL: dal.NewOfferDAL(db, es),
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
func (uc *UserController) GetUserOffers(id int, before time.Time, size int) ([]models.HistoryOffer, error) {
	offs, err := uc.userDAL.GetUserOffers(id, before, size)
	if err != nil{
		return nil, err
	}
	
	hOffs := make([]models.HistoryOffer, 0, len(offs))
	for _, off := range offs{
		uIDs, err := uc.offerDAL.GetMatchedUsers(off.ID)
		if err != nil{
			return nil, err
		}
		
		hoff := models.HistoryOffer{
			Offer: off,
		}

		matchedUsers := make([]models.UserContact, 0, len(uIDs))
		for _, uID := range uIDs{
			info, err  := uc.userDAL.GetUserInfo(uID)
			if err != nil{
				return nil, err
			}

			contact := models.UserContact{
				Username: info.Username, 
				Email: info.Email,
				Telephone: info.Telephone,
			}

			matchedUsers = append(matchedUsers, contact)
		}

		hoff.InterestedUsers = matchedUsers
		hOffs = append(hOffs, hoff)
	}
	
	return hOffs, nil
}