package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddClubMatch struct {
	Repo      ClubMatchAdd
	Validator *validator.Validate
}

func (acm *AddClubMatch) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var clubMatchInfo struct {
		Year      int    `json:"year" validate:"required"`
		Month     int    `json:"month" validate:"required"`
		Day       int    `json:"day" validate:"required"`
		VoteYear  int    `json:"vote_year" validate:"required"`
		VoteMonth int    `json:"vote_month" validate:"required"`
		VoteDay   int    `json:"vote_day" validate:"required"`
		Title     string `json:"title" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&clubMatchInfo); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := acm.Validator.Struct(&clubMatchInfo); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return

	}
	reqcm := &entity.ClubMatch{
		Year:      clubMatchInfo.Year,
		Month:     clubMatchInfo.Month,
		Day:       clubMatchInfo.Day,
		VoteYear:  clubMatchInfo.VoteYear,
		VoteMonth: clubMatchInfo.VoteMonth,
		VoteDay:   clubMatchInfo.VoteDay,
		Title:     clubMatchInfo.Title,
	}

	err := acm.Repo.AddClubMatch(ctx, reqcm)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}
	req := struct {
		ID entity.ClubMatchID `json:"club_match_id"`
	}{ID: reqcm.ID}

	RespondJSON(ctx, w, req, http.StatusOK)
}
