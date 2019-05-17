package main

import (
	"fmt"
	"github.com/mbotarro/unijobs/backend/usecases"
)

func main(){

	uc := usecases.NewUserController()
	fmt.Println(uc.AuthenticateUser())

}