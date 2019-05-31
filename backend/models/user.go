package models

type User struct {
	Username  string `db:"username"`
	Password  string `db:"password"`
	Email     string `db:"email"`
	Address   string `db:"address"`
	Telephone string `db:"telephone"`
	Userid    int    `db:"userid"`
	Student   bool   `db:"universitario"`
}
