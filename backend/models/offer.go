package models

import "time"

// Offer represents a user offer
type Offer struct {
	ID          string    `db:"id" json:"id"`
	Name        string    `db:"name" json:"name"`
	Description string    `db:"description" json:"description"`
	ExtraInfo   string    `db:"extrainfo" json:"extrainfo"`
	MaxPrice    int       `db:"maxprice" json:"maxprice"`
	MinPrice    int       `db:"minprice" json:"minprice"`
	Expiration  time.Time `db:"expiration" json:"expiration"`
	Userid      int       `db:"userid" json:"userid"`
	Categoryid  int       `db:"categoryid" json:"categoryid"`
	Timestamp   time.Time `db:"timestamp" json:"timestamp"`
}
