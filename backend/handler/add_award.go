package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddAward struct {
	Repo      AwardAdd
	Validator *validator.Validate
}

func (aa AddAward) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var a struct {
		AwardName string        `json:"award_name" validate:"required"`
		UserID    entity.UserID `json:"user_id" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := aa.Validator.Struct(&a); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	aid, err := aa.Repo.AddAward(ctx, a.AwardName, a.UserID)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, aid, http.StatusOK)

}
