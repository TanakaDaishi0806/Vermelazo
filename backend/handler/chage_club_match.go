package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type ChangeClubMatch struct {
	Repo      ClubMatchChange
	Validator *validator.Validate
}

func (ccm *ChangeClubMatch) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

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

	if err := ccm.Validator.Struct(&clubMatchInfo); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	reqcm := &entity.ClubMatch{
		ID:        entity.ClubMatchID(id),
		Year:      clubMatchInfo.Year,
		Month:     clubMatchInfo.Month,
		Day:       clubMatchInfo.Day,
		VoteYear:  clubMatchInfo.VoteYear,
		VoteMonth: clubMatchInfo.VoteMonth,
		VoteDay:   clubMatchInfo.VoteDay,
		Title:     clubMatchInfo.Title,
	}

	if err := ccm.Repo.ChangeClubMatch(ctx, reqcm); err != nil {
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
