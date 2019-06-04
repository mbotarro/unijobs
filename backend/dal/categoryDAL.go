package dal

import (
	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
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

// GetAllCategories return ALL categories from category_table
func (dal *CategoryDAL) GetAllCategories() ([]models.Category, error) {
	categories := []models.Category{}
	err := dal.db.Select(&categories, "SELECT * FROM category ORDER BY id ASC")
	if err != nil {
		return nil, err
	}

	return categories, nil
}
