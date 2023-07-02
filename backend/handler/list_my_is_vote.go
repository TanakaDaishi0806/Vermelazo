package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
)

type ListMyIsVote struct {
	Repo MyIsVoteList
}

func (lmsv *ListMyIsVote) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	uid, ok := auth.GetUserID(ctx)
	if !ok {
		RespondJSON(ctx, w, ErrResponse{
			Message: "cannot get userID",
		}, http.StatusInternalServerError)
		return
	}

	lists, err := lmsv.Repo.ListMyIsVote(ctx, uid)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
