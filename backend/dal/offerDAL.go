package dal

import (
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
)

// OfferDAL interacts with the DB to perform Offer related queries
type OfferDAL struct {
	db *sqlx.DB
}

// NewOfferDAL returns a new OfferDAL
func NewOfferDAL(db *sqlx.DB) *OfferDAL {
	return &OfferDAL{
		db: db,
	}
}

// GetLastOffers returns the offers inserted in the dabase before the time specified by timestamp
// The parameter size limits the number of returned offers
func (dal *OfferDAL) GetLastOffers(before time.Time, size int) ([]models.Offer, error) {
	offs := []models.Offer{}
	err := dal.db.Select(&offs,
		`SELECT * FROM offer WHERE timestamp < $1
			ORDER BY timestamp DESC
			LIMIT $2`, before.UTC(), size)
	if err != nil {
		return nil, err
	}

	return offs, nil
}

// InsertOffer Receives an offer as a parameter and inserts into the database
func (dal *OfferDAL) InsertOffer(offer models.Offer) error {
	// Generates an uuid for the offer
	offer.ID = uuid.New().String()

	insertQuery := `INSERT INTO offer (id, name, description, extrainfo, minprice, maxprice, userid, categoryid, timestamp) 
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	// Gets the controller of the database and executes the query
	_, err := dal.db.Exec(insertQuery, offer.ID, offer.Name, offer.Description, offer.ExtraInfo, offer.MinPrice, offer.MaxPrice, offer.Userid, offer.Categoryid, offer.Timestamp)

	// Checks if any error happened during the query execution
	if err != nil {
		return err
	}

	return nil
}
