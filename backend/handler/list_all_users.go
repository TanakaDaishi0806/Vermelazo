package handler

import "net/http"

type ListAllUsers struct {
	Repo AllUsersList
}

func (lau *ListAllUsers) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	lists, err := lau.Repo.ListAllUsers(ctx)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)
}
