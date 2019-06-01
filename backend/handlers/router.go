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
	requestHandler := NewRequestHandler(ctrl.Request)

	route.r.HandleFunc("/createUser", createUserHandler).Methods("POST")
	route.r.HandleFunc("/createCategory", createCategoryHandler).Methods("POST")
	route.r.HandleFunc("/createOffer", createOfferHandler).Methods("POST")

	// User APIs
	route.r.Path("/users/authenticate").
		HandlerFunc(userHandler.authenticateUser).
		Methods("POST")

	// Request APIs
	route.r.Path("/requests").
		Queries("size", "{size:[0-9]*}").
		HandlerFunc(requestHandler.GetLastRequests).
		Methods("GET")

	route.r.Path("/requests").
		Queries("size, before", "{size:[0-9]*, before:[0-9]*}").
		HandlerFunc(requestHandler.GetLastRequests).
		Methods("GET")

	return &route.r
}
