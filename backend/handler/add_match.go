package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddMatch struct {
	Service   AddMatchService
	Validator *validator.Validate
}

type mlist struct {
	MatchID     entity.MatchID     `json:"match_id"`
	ClubMatchID entity.ClubMatchID `json:"club_match_id"`
	TeamIDA     entity.TeamID      `json:"team_id_a"`
	TeamIDB     entity.TeamID      `json:"team_id_b"`
	ScoreA      int                `json:"score_a"`
	ScoreB      int                `json:"score_b"`
	PkA         int                `json:"pk_a"`
	PkB         int                `json:"pk_b"`
}

func (am *AddMatch) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var m struct {
		ClubMatchID entity.ClubMatchID `json:"club_match_id" validate:"required"`
		MatchNum    int                `json:"match_num" validate:"required"`
	}
	if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := am.Validator.Struct(m); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	lists, err := am.Service.AddMatch(ctx, m.ClubMatchID, m.MatchNum)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}
	req := []mlist{}

	for _, l := range lists {
		req = append(req, mlist{
			MatchID:     l.MatchID,
			TeamIDA:     l.TeamIDA,
			TeamIDB:     l.TeamIDB,
			ClubMatchID: l.ClubMatchID,
			ScoreA:      l.ScoreA,
			ScoreB:      l.ScoreB,
			PkA:         l.PkA,
			PkB:         l.PkB,
		})
	}
	RespondJSON(ctx, w, req, http.StatusOK)
}
