package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type ResetPassword struct {
	Service  ResetPasswordService
	Validate *validator.Validate
}

func (rp *ResetPassword) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var prinfo struct {
		ResetToken string `json:"reset_token" validate:"required"`
		Password   string `json:"password" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&prinfo); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := rp.Validate.Struct(prinfo); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := rp.Service.ResetPassword(ctx, prinfo.ResetToken, prinfo.Password); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
