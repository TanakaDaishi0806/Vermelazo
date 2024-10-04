package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type SwitchClubMatchReleased struct {
	Service   SwitchClubMatchReleasedService
	Validator *validator.Validate
}

func (scmr *SwitchClubMatchReleased) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}
	var isReleased struct {
		IsReleased bool `json:"is_released"`
	}

	if err := json.NewDecoder(r.Body).Decode(&isReleased); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := scmr.Validator.Struct(&isReleased); err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	rbool := isReleased.IsReleased

	lists, err := scmr.Service.SwitchClubMatchReleased(ctx, id, rbool)

	if err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}
	rsq := entity.ClubMatchs{}

	for _, l := range lists {
		rsq = append(rsq, &entity.ClubMatch{
			ID:             l.ID,
			Year:           l.Year,
			Month:          l.Month,
			Day:            l.Day,
			VoteYear:       l.VoteYear,
			VoteMonth:      l.VoteMonth,
			VoteDay:        l.VoteDay,
			Title:          l.Title,
			IsReleased:     l.IsReleased,
			IsParticipant:  l.IsParticipant,
			ParticipantNum: l.ParticipantNum,
			IsCreateTeam:   l.IsCreateTeam,
			IsAddMatch:     l.IsAddMatch,
			IsFinish:       l.IsFinish,
			PointTimes:     l.PointTimes,
			ClubMatchType:  l.ClubMatchType,
		})

	}

	RespondJSON(ctx, w, rsq, http.StatusOK)

}
