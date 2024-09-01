package handler

import "net/http"

type ListAuthUrl struct {
	Service ListAuthUrlService
}

func (laurl *ListAuthUrl) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	url, err := laurl.Service.ListAuthUrl()
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	req := struct {
		URL string `json:"auth_url"`
	}{URL: url}

	RespondJSON(ctx, w, req, http.StatusOK)
}
