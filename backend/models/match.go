package models

// Match represents an interest between a user and an offer.
type Match struct {
	Userid  int    `db:"userid" json:"userid"`
	Offerid string `db:"offerid" json:"offerid"`
}
