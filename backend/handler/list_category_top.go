package handler

import (
	"net/http"
)

type ListCategoryTop struct {
	Repo CategoryTopList
}

func (lct *ListCategoryTop) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	lists, err := lct.Repo.ListCategoryTop(ctx)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)

}
