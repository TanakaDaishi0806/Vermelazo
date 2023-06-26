package entity

import (
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type MatchID int64

type Match struct {
	MatchID     MatchID     `json:"match_id" db:"match_id"`
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	TeamIDA     TeamID      `json:"team_id_a" db:"team_id_a"`
	TeamIDB     TeamID      `json:"team_id_b" db:"team_id_b"`
	ScoreA      int         `json:"score_a" db:"score_a"`
	ScoreB      int         `json:"score_b" db:"score_b"`
	IsResister  bool        `json:"is_resister" db:"is_resister"`
}

type Matchs []*Match

func StrTOMatchID(r *http.Request) (MatchID, error) {
	param := chi.URLParam(r, "matchId")
	log.Print("param:"+param, r.URL)
	intid, err := strconv.Atoi(param)
	id := MatchID(intid)
	return id, err
}
