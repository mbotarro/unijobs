package handlers

import (
	"fmt"
	"net/http"

	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/mbotarro/unijobs/backend/tools"
	"github.com/mbotarro/unijobs/backend/usecases"
)

// CategoryHandler handle all Categories API
type CategoryHandler struct {
	categoryController *usecases.CategoryController
}

// NewCategoryHandler returns a new CategoryHandler
func NewCategoryHandler(categoryCtrl *usecases.CategoryController) *CategoryHandler {
	return &CategoryHandler{
		categoryController: categoryCtrl,
	}
}

func (handler *CategoryHandler) getAllCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := handler.categoryController.GetAllCategories()
	if err != nil {
		http.Error(w, fmt.Errorf("%s:%s", errors.DBQueryError, err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println("CATS", categories)
	tools.WriteStructOnHTTPResponse(categories, w)
}
