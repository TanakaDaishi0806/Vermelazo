package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddPositionMom struct {
	Repo      PositionMomAdd
	Validator *validator.Validate
}

func (apm *AddPositionMom) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var p struct {
		ClubMatchID entity.ClubMatchID `json:"club_match_id" validate:"required"`
		Position    entity.PositionNum `json:"position" validate:"required"`
		UserID      entity.UserId      `json:"user_id" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := apm.Validator.Struct(p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	pm := entity.PositionMom{
		ClubMatchID: p.ClubMatchID,
		Position:    p.Position,
		UserID:      p.UserID,
	}

	if err := apm.Repo.AddPositionMom(ctx, pm); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	RespondJSON(ctx, w, pm, http.StatusOK)
}
