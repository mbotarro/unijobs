package usecases

import "github.com/jmoiron/sqlx"

// Controller is a wrapper to all server controllers
type Controller struct {
	User     *UserController
	Category *CategoryController
}

// NewController returns a new Controller
func NewController(db *sqlx.DB) *Controller {
	return &Controller{
		User:     NewUserController(db),
		Category: NewCategoryController(db),
	}
}
