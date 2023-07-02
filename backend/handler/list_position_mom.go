package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListPositionMom struct {
	Repo PositionMomList
}

func (lpm *ListPositionMom) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cmid, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := lpm.Repo.ListPositionMom(ctx, cmid)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
