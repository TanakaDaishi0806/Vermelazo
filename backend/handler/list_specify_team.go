package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListSpecifyTeam struct {
	Repo ListSpecifyTeamService
}

func (lst *ListSpecifyTeam) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	tid, err := entity.StrTOTeamID(r)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := lst.Repo.ListSpecifyTeam(ctx, tid)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)
}
