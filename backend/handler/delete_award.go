package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type DeleteAward struct {
	Repo AwardDelete
}

func (da *DeleteAward) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	aid, err := entity.StrTOAwardID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := da.Repo.DeleteAward(ctx, aid)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
