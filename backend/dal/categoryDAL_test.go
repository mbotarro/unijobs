package dal_test

import (
	"testing"

	"gotest.tools/assert"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
)

const (
	insertCategory = `INSERT INTO category (name, description) VALUES ($1, $2)`
	getCategory    = `SELECT * FROM category WHERE name = $1`
)

func getCategoryDAL(db *sqlx.DB) *dal.CategoryDAL {
	return dal.NewCategoryDAL(db)
}

func TestGetAllCategories(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	categoryDAL := getCategoryDAL(db)

	cats := []models.Category{
		tools.CreateFakeCategory(t, db, "Aula.Matemática", "Aula de Matemática"),
		tools.CreateFakeCategory(t, db, "Aula.Português", "Aula de Português"),
		tools.CreateFakeCategory(t, db, "Aula.Música", "Aula de Música"),
	}

	categories, err := categoryDAL.GetAllCategories()
	assert.Equal(t, nil, err)

	for i, cat := range cats {
		assert.Equal(t, cat.ID, categories[i].ID)
		assert.Equal(t, cat.Name, categories[i].Name)
		assert.Equal(t, cat.Description, categories[i].Description)
	}
}
