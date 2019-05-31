package models

type Request struct {
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
