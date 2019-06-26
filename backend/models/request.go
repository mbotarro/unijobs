package models

import "time"

// Request represents a user request
type Request struct {
	ID          string    `db:"id" json:"id"`
	Name        string    `db:"name" json:"name"`
	Description string    `db:"description" json:"description"`
	ExtraInfo   string    `db:"extrainfo" json:"extrainfo"`
	MaxPrice    int       `db:"maxprice" json:"maxprice"`
	MinPrice    int       `db:"minprice" json:"minprice"`
	Userid      int       `db:"userid" json:"userid"`
	Categoryid  int       `db:"categoryid" json:"categoryid"`
	Timestamp   time.Time `db:"timestamp" json:"timestamp"`
	Telephone   string    `db:"telephone" json:"telephone"`
	Email       string    `db:"email" json:"email"`
}

// RequestES represents a Request in the ES
type RequestES struct {
	ID          string `json:"db_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Category    int    `json:"category"`
	Timestamp   int64  `json:"timestamp"`
}
