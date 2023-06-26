package entity

import (
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type ClubMatchID int64

type ClubMatch struct {
	ID             ClubMatchID `json:"club_match_id" db:"club_match_id"`
	Year           int         `json:"year" db:"year"`
	Month          int         `json:"month" db:"month"`
	Day            int         `json:"day" db:"day"`
	VoteYear       int         `json:"vote_year" db:"vote_year"`
	VoteMonth      int         `json:"vote_month" db:"vote_month"`
	VoteDay        int         `json:"vote_day" db:"vote_day"`
	Title          string      `json:"title" db:"title"`
	IsReleased     bool        `json:"is_released" db:"is_released"`
	IsParticipant  bool        `json:"is_participant" db:"is_participant"`
	ParticipantNum int         `json:"participant_num" db:"participant_num"`
	IsCreateTeam   bool        `json:"is_create_team" db:"is_create_team"`
	IsAddMatch     bool        `json:"is_add_match" db:"is_add_match"`
	IsFinish       bool        `json:"is_finish" db:"is_finish"`
}

type ClubMatchs []*ClubMatch

func StrTOClubMatchID(r *http.Request) (ClubMatchID, error) {
	param := chi.URLParam(r, "clubMatchId")
	log.Print("param:"+param, r.URL)
	intid, err := strconv.Atoi(param)
	id := ClubMatchID(intid)
	return id, err
}
