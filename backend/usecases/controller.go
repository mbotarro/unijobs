package usecases

import "github.com/jmoiron/sqlx"

// Controller is a wrapper to all server controllers
type Controller struct {
	User    *UserController
	Request *RequestController
}

// NewController returns a new Controller
func NewController(db *sqlx.DB) *Controller {
	return &Controller{
		User:    NewUserController(db),
		Request: NewRequestController(db),
	}
}
