package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListPointGetter struct {
	Repo PointGetterList
}

func (lpg *ListPointGetter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	mid, err := entity.StrTOMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}
	tid, err := entity.StrTOTeamID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := lpg.Repo.ListPointGetter(ctx, mid, tid)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)
}
