package dal_test

import (
	"testing"

	"gotest.tools/assert"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
)

const (
	insertCategory = `INSERT INTO category (name, description) VALUES ($1, $2)`
	getCategory    = `SELECT * FROM category WHERE name = $1`
)

func CreateFakeCategory(t *testing.T, db *sqlx.DB, name, description string) *models.Category {
	c := models.Category{}

	db.MustExec(insertCategory, name, description)

	err := db.Get(&c, getCategory, name)
	assert.Equal(t, err, nil)

	return &c
}
