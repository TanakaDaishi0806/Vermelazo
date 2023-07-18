package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type EachMatchMom struct {
	Repo MatchMomEach
}

func (emm *EachMatchMom) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	mid, err := entity.StrTOMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := emm.Repo.EachMatchMom(ctx, mid)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
