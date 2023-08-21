package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type ChangeUserInfo struct {
	Service   ChangeUserInfoService
	Validator *validator.Validate
}

func (cui *ChangeUserInfo) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var u struct {
		Name        string `json:"name" validate:"required"`
		Furigana    string `json:"furigana" validate:"required"`
		StudentID   string `json:"student_id" validate:"required"`
		Grade       int    `json:"grade" validate:"required"`
		MailAddress string `json:"mailaddress" validate:"required"`
		Position    int    `json:"position" validate:"required"`
		Experience  int    `json:"experience"`
	}

	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := cui.Validator.Struct(u); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	requ := &entity.User{
		Name:        u.Name,
		Furigana:    u.Furigana,
		StudentID:   u.StudentID,
		Grade:       entity.GradeNum(u.Grade),
		MailAddress: u.MailAddress,
		Position:    entity.PositionNum(u.Position),
		Experience:  entity.ExperienceNum(u.Experience),
	}

	if err := cui.Service.ChangeUserInfo(ctx, requ); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
