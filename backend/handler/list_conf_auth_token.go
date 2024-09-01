package handler

import "net/http"

type ListConfAuthToken struct {
	Service ListConfAuthTokenService
}

func (lcat *ListConfAuthToken) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	err := lcat.Service.ListConfAuthToken(ctx)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, "", http.StatusOK)
}
