package entity

import (
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type TeamID int64

type TeamIDs []TeamID

type CreateTeamInfo struct {
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	TeamNum     int         `json:"team_num" db:"team_num"`
}

type Team struct {
	ID          TeamID        `json:"team_id" db:"team_id"`
	ClubMatchID ClubMatchID   `json:"club_match_id" db:"club_match_id"`
	UserID      UserId        `json:"user_id" db:"user_id"`
	Name        string        `json:"name" db:"name"`
	Furigana    string        `json:"furigana" db:"furigana"`
	Position    PositionNum   `json:"position" db:"position"`
	Experience  ExperienceNum `json:"experience" db:"experience"`
	Grade       GradeNum      `json:"grade" db:"grade"`
}

type ChangeTeamMember struct {
	ChangeTeamID TeamID      `json:"change_team_id"`
	UserID       UserId      `json:"user_id"`
	ClubMatchID  ClubMatchID `json:"club_match_id"`
}

type Teams []*Team

type PositionMember []*Team

type EachTeams [][]*Team

type SelectNum struct {
	TeamID TeamID
	Num    int
}

type SelectNums []SelectNum

func Contains(list SelectNums, tid TeamID) bool {
	for _, l := range list {
		if l.TeamID == tid {
			return true
		}
	}

	return false
}

func StrTOTeamID(r *http.Request) (TeamID, error) {
	param := chi.URLParam(r, "teamId")
	log.Print("param:"+param, r.URL)
	intid, err := strconv.Atoi(param)
	id := TeamID(intid)
	return id, err
}
