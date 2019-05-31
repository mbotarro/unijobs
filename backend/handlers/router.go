package handlers

import (
	"github.com/gorilla/mux"
	"github.com/mbotarro/unijobs/backend/usecases"
)

// Router Contains a mux.Router object
type Router struct {
	r mux.Router
}

// NewRouter creates the router of the functions and returns a mux.Router object
func NewRouter(ctrl *usecases.Controller) *mux.Router {
	route := Router{
		r: mux.Router{},
	}

	userHandler := NewUserHandler(ctrl.User)
	categoryHandler := NewCategoryHandler(ctrl.Category)

	route.r.HandleFunc("/createUser", createUserHandler).Methods("POST")
	route.r.HandleFunc("/createOffer", createOfferHandler).Methods("POST")
	route.r.HandleFunc("/createRequest", createRequestHandler).Methods("POST")

	// User APIs
	route.r.HandleFunc("/users/authenticate", userHandler.authenticateUser).Methods("POST")

	// Categories API
	route.r.HandleFunc("/categories", categoryHandler.getAllCategories).Methods("GET")

	return &route.r
}
