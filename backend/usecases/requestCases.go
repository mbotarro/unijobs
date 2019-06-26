package usecases

import (
	"time"

	"github.com/olivere/elastic/v7"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
)

// RequestController wraps all Requests' usecases
type RequestController struct {
	requestDAL *dal.RequestDAL
	userDAL    *dal.UserDAL
}

// NewRequestController returns a new RequestController
func NewRequestController(db *sqlx.DB, es *elastic.Client) *RequestController {
	return &RequestController{
		requestDAL: dal.NewRequestDAL(db, es),
		userDAL:    dal.NewUserDAL(db),
	}
}

// GetLastRequests returns all created requests before a given time
// It only returns a limited number of requests, indicated by the parameter size
func (rc *RequestController) GetLastRequests(before time.Time, size int) ([]models.Request, error) {
	return rc.requestDAL.GetLastRequests(before, size)
}

// InsertRequest inserts the given request into the databases (postgres + ES), calling the DAL package function.
// It returns error != nil in case some error occured.
func (rc *RequestController) InsertRequest(req models.Request, telephone bool, email bool) (string, error) {
	u, err := rc.userDAL.GetUserInfo(req.Userid)
	if err != nil {
		return "", nil
	}

	if telephone {
		req.Telephone = u.Telephone
	} else {
		req.Telephone = ""
	}
	if email {
		req.Email = u.Email
	} else {
		req.Email = ""
	}

	id, err := rc.requestDAL.InsertRequestInDB(&req)
	if err != nil {
		return "", err
	}

	err = rc.requestDAL.InsertRequestInES(req)
	if err != nil {
		return "", err
	}

	return id, nil
}

// SearchRequests searches for requests based on a query sent by the user. It can be filtered by one or more categories whose
// ids are passed by parameter
func (rc *RequestController) SearchRequests(query string, categoryIDs ...int) ([]models.Request, error) {
	// Search for the requests ids in ES
	ids, err := rc.requestDAL.SearchInES(query, categoryIDs...)
	if err != nil {
		return nil, err
	}

	// Get the complete documents in Postgres iff ES returned some requests
	reqs := make([]models.Request, 0, len(ids))
	if len(ids) > 0 {
		reqs, err = rc.requestDAL.GetRequestsByID(ids)
		if err != nil {
			return nil, err
		}
	}

	return reqs, nil
}
