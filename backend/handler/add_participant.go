package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddParticipant struct {
	Service   AddParticipantService
	Validator *validator.Validate
}

func (ap *AddParticipant) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var p struct {
		ClubMatchID entity.ClubMatchID `json:"club_match_id" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := ap.Validator.Struct(p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	cmid := p.ClubMatchID

	ptp, err := ap.Service.AddParticipant(ctx, cmid)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	rsp := struct {
		ID entity.PaticipantID `json:"paticipant_id"`
	}{ID: ptp.ID}

	RespondJSON(ctx, w, rsp, http.StatusOK)

}
