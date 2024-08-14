package handler

import "net/http"

type ListGoalNumRankers struct {
	Repo GoalNumRankersList
}

func (lgnr *ListGoalNumRankers) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	lists, err := lgnr.Repo.ListGoalNumRankers(ctx)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)
}
