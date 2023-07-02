package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type ListPositionMember struct {
	Repo      PositionMemberList
	Validator *validator.Validate
}

func (lpm *ListPositionMember) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cmid, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	var p struct {
		Position entity.PositionNum `json:"position" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := lpm.Validator.Struct(p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	ptnum := p.Position

	lists, err := lpm.Repo.ListPositionMember(ctx, cmid, ptnum)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, lists, http.StatusOK)
}
