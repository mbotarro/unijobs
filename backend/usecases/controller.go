package usecases

import(
	"github.com/jmoiron/sqlx"
	"github.com/olivere/elastic/v7"
)

// Controller is a wrapper to all server controllers
type Controller struct {
	User     *UserController
	Category *CategoryController
	Request  *RequestController
	Offer    *OfferController
}

// NewController returns a new Controller
func NewController(db *sqlx.DB, es *elastic.Client) *Controller {
	return &Controller{
		User:     NewUserController(db),
		Category: NewCategoryController(db),
		Request:  NewRequestController(db, es),
		Offer:    NewOfferController(db),
	}
}
