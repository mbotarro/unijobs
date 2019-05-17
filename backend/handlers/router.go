package handlers

import (
	"github.com/gorilla/mux"
	"github.com/mbotarro/unijobs/backend/usecases"
)

// Router Contains a mux.Router object
type Router struct {
	r              mux.Router
	userController *usecases.UserController
}

// NewRouter creates the routes of the functions and returns a mux.Router object
func NewRouter() *mux.Router {
	route := Router{
		r:              mux.Router{},
		userController: &usecases.UserController{},
	}
	route.r.HandleFunc("/createUser", createUserHandler).Methods("POST")
	route.r.HandleFunc("/createCategory", createCategoryHandler).Methods("POST")
	route.r.HandleFunc("/createOffer", createOfferHandler).Methods("POST")
	route.r.HandleFunc("/createInterest", createInterestHandler).Methods("POST")

	route.r.HandleFunc("/users/authenticate", route.authenticateUser).Methods("POST")
	//route.r.HandleFunc("/modifyUser", ModifyUser)
	return &route.r
}
