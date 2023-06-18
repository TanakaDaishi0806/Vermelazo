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
		LeftTeamID  entity.TeamID `json:"left_team_id" validate:"required"`
		RightTeamID entity.TeamID `json:"right_team_id" validate:"required"`
		LeftUserID  entity.UserId `json:"left_user_id" validate:"required"`
		RightUserID entity.UserId `json:"right_user_id" validate:"required"`
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
		LeftTeamID:  c.LeftTeamID,
		RightTeamID: c.RightTeamID,
		LeftUserID:  c.LeftUserID,
		RightUserID: c.RightUserID,
		ClubMatchID: cmid,
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
