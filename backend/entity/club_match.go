package entity

import (
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type ClubMatchID int64

type ClubMatch struct {
	ID         ClubMatchID `json:"club_match_id" db:"club_match_id"`
	Year       int         `json:"year" db:"year"`
	Month      int         `json:"month" db:"month"`
	Day        int         `json:"day" db:"day"`
	VoteYear   int         `json:"vote_year" db:"vote_year"`
	VoteMonth  int         `json:"vote_month" db:"vote_month"`
	VoteDay    int         `json:"vote_day" db:"vote_day"`
	Title      string      `json:"title" db:"title"`
	IsReleased bool        `json:"is_released" db:"is_released"`
}

type ClubMatchs []*ClubMatch

func StrTOClubMatchID(r *http.Request) (ClubMatchID, error) {
	param := chi.URLParam(r, "userId")
	log.Print("param:"+param, r.URL)
	intid, err := strconv.Atoi(param)
	id := ClubMatchID(intid)
	return id, err
}
