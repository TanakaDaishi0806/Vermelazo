package handler

import (
	"net/http"
)

type ListAward struct {
	Repo AwardList
}

func (la *ListAward) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	lists, err := la.Repo.ListAward(ctx)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
