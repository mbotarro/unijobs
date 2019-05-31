package dal

import (
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/jmoiron/sqlx"
)

// CategoryDAL interacts with the DB to perform Category related queries
type CategoryDAL struct {
	db *sqlx.DB
}

// NewCategoryDAL returns a new CategoryDAL
func NewCategoryDAL(db *sqlx.DB) *CategoryDAL {
	return &CategoryDAL{
		db: db,
	}
}

// GelAllCategories return ALL categories from category_table
func (dal *CategoryDAL) GetAllCategories() ([]*models.Category, error) {
	categories := []*models.Category
	err := dal.db.Select(&categories, "SELECT * FROM category")
	if err != nil{
		panic(err)
	}

	return categories, nil
}
