package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddMyteamMom struct {
	Repo      MyteamMomAdd
	Validator *validator.Validate
}

func (amm *AddMyteamMom) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	uid, ok := auth.GetUserID(ctx)
	if !ok {
		RespondJSON(ctx, w, ErrResponse{
			Message: "cannot get userID",
		}, http.StatusInternalServerError)
		return
	}

	var m struct {
		ClubMatchID entity.ClubMatchID `json:"club_match_id" validate:"required"`
		MatchID     entity.MatchID     `json:"match_id" validate:"required"`
		UserID      entity.UserId      `json:"user_id" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := amm.Validator.Struct(m); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	mm := entity.MyTeamMom{
		ClubMatchID: m.ClubMatchID,
		MatchID:     m.MatchID,
		UserID:      m.UserID,
	}

	if err := amm.Repo.AddMyteamMom(ctx, mm, uid); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	RespondJSON(ctx, w, mm, http.StatusOK)
}
