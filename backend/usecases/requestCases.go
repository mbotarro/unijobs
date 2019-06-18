package usecases

import (
	"github.com/olivere/elastic/v7"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
)

// RequestController wraps all Requests' usecases
type RequestController struct {
	requestDAL *dal.RequestDAL
}

// NewRequestController returns a new RequestController
func NewRequestController(db *sqlx.DB, es *elastic.Client) *RequestController {
	return &RequestController{
		requestDAL: dal.NewRequestDAL(db,es),
	}
}

// GetLastRequests returns all created requests before a given time
// It only returns a limited number of requests, indicated by the parameter size
func (rc *RequestController) GetLastRequests(before time.Time, size int) ([]models.Request, error) {
	return rc.requestDAL.GetLastRequests(before, size)
}

// InsertRequest inserts the given request into the database, calling the DAL package function.
// It returns error != nil in case some error occured.
func (rc *RequestController) InsertRequest(req models.Request) error {
	return rc.requestDAL.InsertRequest(req)
}

// InsertRequestInES inserts the given request into ElasticSearch.
// It returns error != nil when some error occured.
func (rc *RequestController) InsertRequestInES(req models.Request) error {
	return rc.requestDAL.InsertRequestInES(req)
}

// SearchRequests searches for requests based on a query sent by the user. It can be filtered by one or more categories whose
// ids are passed by parameter
func (rc *RequestController) SearchRequests(query string, categoryIDs ...int) ([]models.Request, error){
	// Search for the requests ids in ES
	ids, err := rc.requestDAL.SearchInES(query, categoryIDs...)
	if (err != nil){
		return nil, err
	}

	// Get the complete documents in Postgres
	reqs, err := rc.requestDAL.GetRequestsByID(ids)
	if (err != nil){
		return nil, err
	}

	return reqs, nil
}
