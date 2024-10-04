package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type CreateTournament struct {
	Service   CreateTournamentService
	Validator *validator.Validate
}

func (ct *CreateTournament) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var t struct {
		ClubMatchID entity.ClubMatchID `json:"club_match_id" validate:"required"`
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

	lists, err := ct.Service.CreateTournament(ctx, t.ClubMatchID)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
