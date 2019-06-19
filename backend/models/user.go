package models

// User wraps all user info stores by the platform
type User struct {
	Username  string `db:"username" json:"username"`
	Password  string `db:"password" json:"password"`
	Email     string `db:"email" json:"email"`
	Address   string `db:"address" json:"address"`
	Telephone string `db:"telephone" json:"telephone"`
	Userid    int    `db:"userid" json:"userid"`
	Student   bool   `db:"student" json:"student"`
}
