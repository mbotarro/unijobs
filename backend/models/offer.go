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
	Telephone   string    `db:"telephone" json:"telephone"`
	Email       string    `db:"email" json:"email"`
}

// MatchedOffer represents an offer with the information if an user has matched it or not
type MatchedOffer struct {
	Offer        // Get all Offer parameters
	Matched bool `db:"matched" json:"matched"`
}

// HistoryOffer represents an Offer in an User History. It contains information about
// other users that liked it
type HistoryOffer struct {
	Offer                         // Get all Offer parameters
	InterestedUsers []UserContact // Contat of all users who matched this offer
}

// OfferES represents an Offer in the ES
type OfferES struct {
	ID          string `json:"db_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Category    int    `json:"category"`
	Timestamp   int64  `json:"timestamp"`
}
