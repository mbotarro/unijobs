package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
	"github.com/mbotarro/unijobs/backend/usecases"
)

// UserHandler handle all Users API
type UserHandler struct {
	userController *usecases.UserController
}

// UserAuthentication has all the information that the frontend sends to authenticate an user
type UserAuthentication struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// UserAuthenticationResponse contains the authentication response sent to the frontend
type UserAuthenticationResponse struct {
	Email string `json:"email"`
	ID    int    `json:"id"`
	Valid bool   `json:"valid"`
}

// NewUserHandler returns a new UserHandler
func NewUserHandler(userCtrl *usecases.UserController) *UserHandler {
	return &UserHandler{
		userController: userCtrl,
	}
}

// AuthenticateUser returns if a user is in the DB or not. If he's in the DB, returns his ID as well
func (handler *UserHandler) AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.ReadRequestBodyError, err.Error()).Error(), http.StatusBadRequest)
		return
	}

	var ua UserAuthentication
	err = json.Unmarshal(body, &ua)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.JSONUnmarshalError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	valid, id, err := handler.userController.AuthenticateUser(ua.Email, ua.Password)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	res := UserAuthenticationResponse{
		Email: ua.Email,
		ID:    id,
		Valid: valid,
	}

	tools.WriteStructOnHTTPResponse(res, w)
}

// GetUserInfo returns all the information about an user
func (handler *UserHandler) GetUserInfo(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]
	id, err := strconv.ParseInt(idStr, 10, 32)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
		return
	}

	u, err := handler.userController.GetUserInfo(int(id))
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	tools.WriteStructOnHTTPResponse(u, w)
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	log.Println(string(body))
	var userdata models.User
	err = json.Unmarshal(body, &userdata)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "You've requested the user: %s\n", userdata.Username)
}

// GetUserRequests return Requests required by the user
func (handler *UserHandler) GetUserRequests(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]
	id, err := strconv.ParseInt(idStr, 10, 32)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
		return
	}

	sizeStr := r.FormValue("size")
	size, err := strconv.ParseInt(sizeStr, 10, 32)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
		return
	}

	before := time.Now()
	beforeStr := r.FormValue("before")
	if beforeStr != "" {
		beforeInt, err := strconv.ParseInt(beforeStr, 10, 64)
		if err != nil {
			http.Error(w, fmt.Errorf("%s:%s", errors.QueryParameterError, err.Error()).Error(), http.StatusBadRequest)
			return
		}

		before = time.Unix(beforeInt, 0)
	}

	reqs, err := handler.userController.GetUserRequests(int(id), before, int(size))
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	reqRes := RequestResponse{
		Requests: reqs,
	}

	if l := len(reqs); l > 0 {
		reqRes.Last = reqs[l-1].Timestamp.Unix()
	}

	tools.WriteStructOnHTTPResponse(reqRes, w)
}
