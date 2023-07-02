package handler

import "net/http"

type MyRank struct {
	Service MyRankService
}

func (mr *MyRank) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	lists, err := mr.Service.MyRank(ctx)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)
}
