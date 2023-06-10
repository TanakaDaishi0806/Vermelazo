package entity

import (
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type ClubMatchID int64

type ClubMatch struct {
	ID    ClubMatchID `json:"club_match_id" db:"club_match_id"`
	Year  int         `json:"year" db:"year"`
	Month int         `json:"month" db:"month"`
	Day   int         `json:"day" db:"day"`
	Title string      `json:"title" db:"title"`
}

type ClubMatchs []*ClubMatch

func StrTOClubMatchID(r *http.Request) (ClubMatchID, error) {
	param := chi.URLParam(r, "userId")
	log.Print("param:"+param, r.URL)
	intid, err := strconv.Atoi(param)
	id := ClubMatchID(intid)
	return id, err
}
