package models

type Category struct {
	ID          int    `db:"id"`
	Name        string `db:"name"`
	Description string `db:"description"`
}
