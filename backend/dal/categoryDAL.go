package dal

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/models"
)

type InterestDAL struct {
	db *sqlx.DB
}

func NewInterestDAL(db *sqlx.DB) *InterestDAL {
	return &InterestDAL{
		db: db,
	}
}

// GetLastInterests returns Interests created in the database
func (dal *InterestDAL) GetLastInterests() ([]models.Interest, error) {
	ints := []models.Interest{}
	err := dal.db.Select(&ints, "SELECT * FROM interest")
	if err != nil {
		return nil, err
	}

	fmt.Println("GOT INTERESTS: ", ints)

	return ints, nil
}
