package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListUserInfo struct {
	Service ListUserInfoService
}

func (lui *ListUserInfo) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	lists, err := lui.Service.ListUserInfo(ctx)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	var u struct {
		Name        string               `json:"name"`
		Furigana    string               `json:"furigana"`
		StudentID   string               `json:"student_id"`
		Grade       entity.GradeNum      `json:"grade"`
		MailAddress string               `json:"mailaddress"`
		Position    entity.PositionNum   `json:"position"`
		Experience  entity.ExperienceNum `json:"experience"`
	}

	u.Name = lists.Name
	u.Furigana = lists.Furigana
	u.StudentID = lists.StudentID
	u.Grade = lists.Grade
	u.MailAddress = lists.MailAddress
	u.Position = lists.Position
	u.Experience = lists.Experience

	RespondJSON(ctx, w, u, http.StatusOK)
}
