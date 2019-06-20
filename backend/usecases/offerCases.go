package usecases

import (
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/olivere/elastic/v7"
)

// OfferController wraps all Offers' usecases
type OfferController struct {
	offerDAL *dal.OfferDAL
}

// NewOfferController returns a new OfferController
func NewOfferController(db *sqlx.DB, es *elastic.Client) *OfferController {
	return &OfferController{
		offerDAL: dal.NewOfferDAL(db, es),
	}
}

// GetLastOffers returns all created offers before a given time
// It only returns a limited number of offers, indicated by the parameter size
func (rc *OfferController) GetLastOffers(before time.Time, size int) ([]models.Offer, error) {
	return rc.offerDAL.GetLastOffers(before, size)
}

// InsertOffer inserts the given offer into the databases (postgres + ES), calling the DAL package function.
// It returns error != nil in case some error occured.
func (rc *OfferController) InsertOffer(offer models.Offer) (string, error) {
	id, err := rc.offerDAL.InsertOfferInDB(&offer)
	if err != nil {
		return "", nil
	}

	err = rc.offerDAL.InsertOfferInES(offer)
	if err != nil {
		return "", nil
	}

	return id, nil
}
