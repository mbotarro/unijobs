package models

type Offer struct {
	ID          int
	Name        string
	Description string
	ExtraInfo   string
	MaxPrice    int
	MinPrice    int
	Userid      int
	Categoryid  int
	Timestamp   int64
}
