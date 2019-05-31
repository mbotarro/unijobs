package models

import "time"

type Offer struct {
	ID          int       `db:"id"`
	Name        string    `db:"name"`
	Description string    `db:"description"`
	ExtraInfo   string    `db:"extrainfo"`
	MaxPrice    int       `db:"maxprice"`
	MinPrice    int       `db:"minprice"`
	Userid      int       `db:"userid"`
	Categoryid  int       `db:"categoryid"`
	Timestamp   time.Time `db:"timestamp"`
}
