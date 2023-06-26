package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddScore struct {
	Repo      ScoreAdd
	Validator *validator.Validate
}

func (as *AddScore) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	mid, err := entity.StrTOMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}
	var s struct {
		ScoreA int `json:"score_a" validate:"required"`
		ScoreB int `json:"score_b" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&s); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := as.Validator.Struct(s); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	m := &entity.Match{
		MatchID: mid,
		ScoreA:  s.ScoreA,
		ScoreB:  s.ScoreB,
	}

	if err := as.Repo.AddScore(ctx, m); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, m, http.StatusOK)

}
