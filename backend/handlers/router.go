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
	requestHandler := NewRequestHandler(ctrl.Request)

	route.r.HandleFunc("/createUser", createUserHandler).Methods("POST")
	route.r.HandleFunc("/createOffer", createOfferHandler).Methods("POST")

	// User APIs
	route.r.Path("/users/authenticate").
		HandlerFunc(userHandler.AuthenticateUser).
		Methods("POST")
	route.r.Path("/users/{id:[0-9]+}").
		HandlerFunc(userHandler.GetUserInfo).
		Methods("GET")

	// Request APIs
	// Get last requests
	route.r.Path("/requests").
		Queries("size", "{size:[0-9]+}").
		HandlerFunc(requestHandler.GetLastRequests).
		Methods("GET")

	// Get last requests with paging
	route.r.Path("/requests").
		Queries("size", "{size:[0-9]+}", "before", "{before:[0-9]+}").
		HandlerFunc(requestHandler.GetLastRequests).
		Methods("GET")

	// Send new request
	route.r.Path("/requests").
		HandlerFunc(requestHandler.InsertRequest).
		Methods("POST")

	// Categories API
	route.r.HandleFunc("/categories", categoryHandler.getAllCategories).Methods("GET")

	return &route.r
}
