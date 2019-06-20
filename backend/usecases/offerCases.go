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

// SearchOffers searches for offers based on a query sent by the user. It can be filtered by one or more categories whose
// ids are passed by parameter
func (rc *OfferController) SearchOffers(query string, categoryIDs ...int) ([]models.Offer, error) {
	// Search for the requests ids in ES
	ids, err := rc.offerDAL.SearchInES(query, categoryIDs...)
	if err != nil {
		return nil, err
	}

	// Get the complete documents in Postgres iff ES returned some requests
	reqs := make([]models.Offer, 0, len(ids))
	if len(ids) > 0 {
		reqs, err = rc.offerDAL.GetOffersByID(ids)
		if err != nil {
			return nil, err
		}
	}

	return reqs, nil
}
