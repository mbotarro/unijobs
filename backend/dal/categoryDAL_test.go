package dal_test

import (
	"testing"

	"gotest.tools/assert"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/tools"
)

const (
	insertCategory = `INSERT INTO category (name, description) VALUES ($1, $2)`
	getCategory    = `SELECT * FROM category WHERE name = $1`
)

func createFakeCategory(t *testing.T, db *sqlx.DB, name, description string) *models.Category {
	c := models.Category{}

	db.MustExec(insertCategory, name, description)

	err := db.Get(&c, getCategory, name)
	assert.Equal(t, err, nil)

	return &c
}


func getCategoryDAL(db *sqlx.DB) *dal.CategoryDAL {
	return dal.NewCategoryDAL(db)
}

func TestGetAllCategories(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	categoryDAL := getCategoryDAL(db)

	categories, err := categoryDAL.GetAllCategories()

	for category
}