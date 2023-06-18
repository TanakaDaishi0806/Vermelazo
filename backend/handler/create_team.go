package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type CreateTeam struct {
	Service   CreateTeamService
	Validator *validator.Validate
}

func (ct *CreateTeam) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var t struct {
		ClubMatchID entity.ClubMatchID `json:"club_match_id" validate:"required"`
		TeamNum     int                `json:"team_num" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := ct.Validator.Struct(t); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	cti := &entity.CreateTeamInfo{
		ClubMatchID: t.ClubMatchID,
		TeamNum:     t.TeamNum,
	}

	lists, err := ct.Service.CreateTeam(ctx, cti)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
