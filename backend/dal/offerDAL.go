package dal

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
	"github.com/olivere/elastic/v7"
)

// OfferDAL interacts with the DB to perform Offer related queries
type OfferDAL struct {
	db *sqlx.DB
	es *elastic.Client
}

// NewOfferDAL returns a new OfferDAL
func NewOfferDAL(db *sqlx.DB, es *elastic.Client) *OfferDAL {
	return &OfferDAL{
		db: db,
		es: es,
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

// InsertOfferInDB Receives an offer as a parameter and inserts into the database
func (dal *OfferDAL) InsertOfferInDB(offer *models.Offer) (string, error) {
	// Generates an uuid for the offer
	offer.ID = uuid.New().String()

	insertQuery := `INSERT INTO offer (id, name, description, extrainfo, minprice, maxprice, userid, categoryid, timestamp) 
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	// Gets the controller of the database and executes the query
	_, err := dal.db.Exec(insertQuery, offer.ID, offer.Name, offer.Description, offer.ExtraInfo, offer.MinPrice, offer.MaxPrice, offer.Userid, offer.Categoryid, offer.Timestamp)

	// Checks if any error happened during the query execution
	if err != nil {
		return "", err
	}

	return offer.ID, nil
}

// InsertOfferInES inserts an Offer in ES
func (dal *OfferDAL) InsertOfferInES(offer models.Offer) error {
	oES := models.OfferES{
		ID:          offer.ID,
		Name:        offer.Name,
		Description: offer.Description,
		Category:    offer.Categoryid,
		Timestamp:   offer.Timestamp.Unix(),
	}

	_, err := dal.es.Index().
		Index("offer").
		Id(oES.ID).
		BodyJson(oES).
		Refresh("true").
		Do(context.Background())
	if err != nil {
		return fmt.Errorf("%s:%s", errors.ESInsertError, err.Error())
	}

	return nil
}

// SearchInES searches for Offers in ES given a query.
// If one or more category ID is informed, the results are filtered to only contain offers beloging to them.
// A slice with the IDs of the matched offers are returned
func (dal *OfferDAL) SearchInES(query string, categoryIDs ...int) ([]string, error) {
	searchResult, err := searchDocumentInES(dal.es, "offer", query, categoryIDs...)
	if err != nil {
		return nil, err
	}

	// Get the matched Offers
	offs, err := tools.GetOffersFromSearchResult(searchResult)
	if err != nil {
		return nil, err
	}

	// Get the UUIDs of the matched offers
	ids := make([]string, 0, len(offs))
	for _, off := range offs {
		ids = append(ids, off.ID)
	}

	return ids, nil
}
