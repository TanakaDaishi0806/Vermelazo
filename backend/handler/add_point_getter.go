package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddPointGetter struct {
	Repo      PointGetterAdd
	Validator *validator.Validate
}

func (apg *AddPointGetter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var p struct {
		MatchID     entity.MatchID     `json:"match_id" validate:"required"`
		TeamID      entity.TeamID      `json:"team_id" validate:"required"`
		UserID      entity.UserId      `json:"user_id" validate:"required"`
		ClubMatchID entity.ClubMatchID `json:"club_match_id" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := apg.Validator.Struct(p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	pg := &entity.PointGetter{
		MatchID:     p.MatchID,
		TeamID:      p.TeamID,
		UserID:      p.UserID,
		ClubMatchID: p.ClubMatchID,
	}

	if err := apg.Repo.AddPointGetter(ctx, pg); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, pg, http.StatusOK)
}
