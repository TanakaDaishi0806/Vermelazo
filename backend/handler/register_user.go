package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type RegisterUser struct {
	Service   RegisterUserService
	Validator *validator.Validate
}

func (ru *RegisterUser) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var userInfo struct {
		Name        string `json:"name" validate:"required"`
		Furigana    string `json:"furigana" validate:"required"`
		StudentID   string `json:"student_id" validate:"required"`
		Password    string `json:"password" validate:"required"`
		Grade       int    `json:"grade" validate:"required"`
		MailAddress string `json:"mailaddress" validate:"required"`
		Position    int    `json:"position" validate:"required"`
		Experience  int    `json:"experience"`
	}

	if err := json.NewDecoder(r.Body).Decode(&userInfo); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := ru.Validator.Struct(userInfo); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}
	requ := &entity.User{
		Name:        userInfo.Name,
		Furigana:    userInfo.Furigana,
		StudentID:   userInfo.StudentID,
		Password:    userInfo.Password,
		Grade:       entity.GradeNum(userInfo.Grade),
		MailAddress: userInfo.MailAddress,
		Position:    entity.PositionNum(userInfo.Position),
		Experience:  entity.ExperienceNum(userInfo.Experience),
	}

	u, err := ru.Service.RegisterUser(ctx, requ)
	if err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}
	req := struct {
		ID entity.UserId `json:"user_id"`
	}{ID: u.ID}

	RespondJSON(ctx, w, req, http.StatusOK)

}
