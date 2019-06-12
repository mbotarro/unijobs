package usecases

import (
	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
)

// CategoryController wraps all Category usecases
type CategoryController struct {
	categoryDAL *dal.CategoryDAL
}

// NewCategoryController returns a new CategoryController
func NewCategoryController(db *sqlx.DB) *CategoryController {
	return &CategoryController{
		categoryDAL: dal.NewCategoryDAL(db),
	}
}

// GetAllCategories return ALL categories from category_table
func (cc *CategoryController) GetAllCategories() ([]models.Category, error) {
	return cc.categoryDAL.GetAllCategories()
}
