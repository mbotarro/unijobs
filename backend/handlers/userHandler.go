package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

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
	Valid bool   `json:"valid"`
}

// NewUserHandler returns a new UserHandler
func NewUserHandler(userCtrl *usecases.UserController) *UserHandler {
	return &UserHandler{
		userController: userCtrl,
	}
}

func (handler *UserHandler) authenticateUser(w http.ResponseWriter, r *http.Request) {
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

	valid, err := handler.userController.AuthenticateUser(ua.Email, ua.Password)
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	res := UserAuthenticationResponse{
		Email: ua.Email,
		Valid: valid,
	}

	tools.WriteStructOnHTTPResponse(res, w)
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
