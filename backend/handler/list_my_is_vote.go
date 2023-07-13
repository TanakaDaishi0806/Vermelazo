package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
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
	cmid, err := entity.StrTOClubMatchID(r)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := lmsv.Repo.ListMyIsVote(ctx, uid, cmid)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
