package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type ChangePositionMom struct {
	Repo      PositionMomChange
	Validator *validator.Validate
}

func (cpm *ChangePositionMom) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cmid, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	var p struct {
		Position entity.PositionNum `json:"position" validate:"required"`
		UserID   entity.UserId      `json:"user_id" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := cpm.Validator.Struct(p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	pm := entity.PositionMom{
		ClubMatchID: cmid,
		Position:    p.Position,
		UserID:      p.UserID,
	}

	if err := cpm.Repo.ChangePositionMom(ctx, pm); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	RespondJSON(ctx, w, pm, http.StatusOK)
}
