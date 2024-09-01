package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type ChangeSecretTokenJson struct {
	Service   ChangeSecretTokenJsonService
	Validator *validator.Validate
}

func (cstj *ChangeSecretTokenJson) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var a struct {
		CodeUrl string `json:"code_url" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := cstj.Validator.Struct(&a); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	_, err := cstj.Service.ChangeSecretTokenJson(ctx, a.CodeUrl)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	RespondJSON(ctx, w, "", http.StatusOK)
}
