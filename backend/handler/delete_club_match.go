package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type DeleteClubMatch struct {
	Repo ClubMatchDelete
}

func (dcm *DeleteClubMatch) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := dcm.Repo.DeleteClubMatch(ctx, id); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	req := struct {
		ID entity.ClubMatchID `json:"club_match_id"`
	}{ID: id}

	RespondJSON(ctx, w, req, http.StatusOK)

}
