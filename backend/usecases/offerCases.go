package usecases

import (
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
)

// OfferController wraps all Offers' usecases
type OfferController struct {
	offerDAL *dal.OfferDAL
	userDAL  *dal.UserDAL
}

// NewOfferController returns a new OfferController
func NewOfferController(db *sqlx.DB) *OfferController {
	return &OfferController{
		offerDAL: dal.NewOfferDAL(db),
		userDAL:  dal.NewUserDAL(db),
	}
}

// GetLastOffers returns all created offers before a given time
// It only returns a limited number of offers, indicated by the parameter size
func (rc *OfferController) GetLastOffers(before time.Time, size int) ([]models.Offer, error) {
	return rc.offerDAL.GetLastOffers(before, size)
}

// InsertOffer inserts the given offer into the database, calling the DAL package function.
// It returns error != nil in case some error occured.
func (rc *OfferController) InsertOffer(offer models.Offer, telephone bool, email bool) error {
	u, err := rc.userDAL.GetUserInfo(offer.Userid)
	if err != nil {
		return nil
	}

	if telephone {
		offer.Telephone = u.Telephone
	} else {
		offer.Telephone = ""
	}
	if email {
		offer.Email = u.Email
	} else {
		offer.Email = ""
	}

	return rc.offerDAL.InsertOffer(offer)
}
