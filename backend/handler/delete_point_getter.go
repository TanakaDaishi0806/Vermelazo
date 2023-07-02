package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type DeletePointGetter struct {
	Repo PointGetterDelete
}

func (dpg *DeletePointGetter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	mid, err := entity.StrTOMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := dpg.Repo.DeletePointGetter(ctx, mid); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, mid, http.StatusOK)
}
