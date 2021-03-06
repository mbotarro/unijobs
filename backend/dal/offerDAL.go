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
// It will return the ID of the inserted offer.
func (dal *OfferDAL) InsertOfferInDB(offer *models.Offer) (string, error) {
	// Generates an uuid for the offer
	offer.ID = uuid.New().String()

	insertQuery := `INSERT INTO offer (id, name, description, extrainfo, minprice, maxprice, expiration, userid, categoryid, timestamp, telephone, email) 
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

	// Gets the controller of the database and executes the query
	_, err := dal.db.Exec(insertQuery, offer.ID, offer.Name, offer.Description, offer.ExtraInfo, offer.MinPrice,
		offer.MaxPrice, offer.Expiration, offer.Userid, offer.Categoryid, offer.Timestamp, offer.Telephone, offer.Email)

	// Checks if any error happened during the query execution
	if err != nil {
		return "", err
	}

	return offer.ID, nil
}

// GetOffersByID fetch from postgreSQL the offers whose ids are passed in parameter
func (dal *OfferDAL) GetOffersByID(ids []string) ([]models.Offer, error) {
	offs := []models.Offer{}
	query, args, err := sqlx.In(`SELECT * FROM offer WHERE id IN (?) ORDER BY timestamp DESC`, ids)
	if err != nil {
		return nil, err
	}

	// Transform (?, ?, ...) in postgres specific ($1, $2, $3)
	query = dal.db.Rebind(query)

	rows, err := dal.db.Queryx(query, args...)
	if err != nil {
		return nil, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error())
	}

	// Transform the fecthed rows into offer struct
	for rows.Next() {
		var r models.Offer
		err = rows.StructScan(&r)
		offs = append(offs, r)
	}

	return offs, nil
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

// InsertOfferMatch receives the id of the user and the offer and inserts the match into the match table
func (dal *OfferDAL) InsertOfferMatch(userid int, offerid string) error {
	// Checks if the offer is valid
	off := models.Offer{}
	err := dal.db.Get(&off,
		`SELECT * FROM offer WHERE ID = $1
			LIMIT 1`, offerid)
	if err != nil {
		return err
	}
	if off.ID == "" {
		return fmt.Errorf("%s:%s", errors.OfferNotFound, err.Error())
	}

	// Checks if the user is valid
	user := models.User{}
	err = dal.db.Get(&user,
		`SELECT * FROM USERDATA WHERE USERID = $1
			LIMIT 1`, userid)
	if err != nil {
		return err
	}
	if user.Userid == 0 {
		return fmt.Errorf("%s:%s", errors.UserNotFound, err.Error())
	}

	insertQuery := `INSERT INTO match(userid, offerid) 
						VALUES ($1, $2)`

	// Gets the controller of the database and executes the query
	_, err = dal.db.Exec(insertQuery, userid, offerid)
	if err != nil {
		return err
	}

	return nil
}

// GetOfferMatchStatus receives the id of the user and the offer and inserts the match into the match table
func (dal *OfferDAL) GetOfferMatchStatus(userid int, offerid string) (bool, error) {
	selectQuery := `SELECT count(*) from match
						WHERE userid = $1 
						AND offerid = $2`

	var count int
	err := dal.db.Get(&count, selectQuery, userid, offerid)
	fmt.Printf("%d\n", count)
	if err != nil {
		return false, err
	}
	if count == 0 {
		return false, nil
	}
	return true, nil
}

// GetMatchedUsers return the ids from users that have matched the offer which id is passed in parameter
func (dal *OfferDAL) GetMatchedUsers(offerid string) ([]int, error){
	ids := []int{}
	err := dal.db.Select(&ids, 
		`SELECT userid FROM match WHERE offerid = $1`, offerid)
	if err != nil {
		return nil, err
	}
	return ids, nil
}
