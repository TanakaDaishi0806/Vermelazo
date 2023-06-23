package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type ChangeTeam struct {
	Service   ChangeTeamService
	Validator *validator.Validate
}

func (ct *ChangeTeam) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cmid, err := entity.StrTOClubMatchID(r)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	var c struct {
		ChangeTeamID entity.TeamID `json:"change_team_id" validate:"required"`
		UserID       entity.UserId `json:"user_id" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := ct.Validator.Struct(c); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	ctm := &entity.ChangeTeamMember{
		ChangeTeamID: c.ChangeTeamID,
		UserID:       c.UserID,
		ClubMatchID:  cmid,
	}

	lists, err := ct.Service.ChangeTeam(ctx, ctm)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)
}
