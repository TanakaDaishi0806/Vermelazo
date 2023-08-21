package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type ChangeUserPassword struct {
	Service   ChangeUserPasswordService
	Validator *validator.Validate
}

func (cup *ChangeUserPassword) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var u struct {
		Password string `json:"password" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := cup.Validator.Struct(u); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}
	p := u.Password

	if err := cup.Service.ChangeUserPassword(ctx, p); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
