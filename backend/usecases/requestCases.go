package usecases

import (
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
func NewRequestController(db *sqlx.DB) *RequestController {
	return &RequestController{
		requestDAL: dal.NewRequestDAL(db),
	}
}

// GetLastRequests returns all created requests before a given time
// It only returns a limited number of requests, indicated by the parameter size
func (rc *RequestController) GetLastRequests(before time.Time, size int) ([]models.Request, error) {
	return rc.requestDAL.GetLastRequests(before, size)
}
