package entity

type ClubMatchID int64

type ClubMatch struct {
	ID    ClubMatchID `json:"club_match_num" db:"club_match_num"`
	Year  int         `json:"year" db:"year"`
	Month int         `json:"month" db:"month"`
	Day   int         `json:"day" db:"day"`
}
