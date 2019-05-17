package handlers

import (
	"github.com/gorilla/mux"
)

type Router struct {
	r mux.Router
}

func NewRouter() *mux.Router {
	var route Router
	route.r.HandleFunc("/createUser", createUserHandler).Methods("POST")
	//route.r.HandleFunc("/modifyUser", ModifyUser)
	return &route.r
}
