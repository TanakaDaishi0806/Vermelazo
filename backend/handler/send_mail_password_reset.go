package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type SendMailPasswordReset struct {
	Service  SendMailPasswordResetService
	Validate *validator.Validate
}

func (smpr *SendMailPasswordReset) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var prinfo struct {
		StudentID   string `json:"student_id" validate:"required"`
		Mailaddress string `json:"mailaddress" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&prinfo); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := smpr.Validate.Struct(prinfo); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := smpr.Service.SendMailPasswordReset(ctx, prinfo.StudentID, prinfo.Mailaddress); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
