package handler

import (
	"encoding/json"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-playground/validator/v10"
)

type AddParticipant struct {
	Service   AddParticipantService
	Validator *validator.Validate
}

func (ap *AddParticipant) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var p struct {
		ClubMatchID entity.ClubMatchID `json:"club_match_id" validate:"required"`
	}

	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if err := ap.Validator.Struct(&p); err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusBadRequest)
		return
	}

	cmid := p.ClubMatchID

	lists, err := ap.Service.AddParticipant(ctx, cmid)

	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
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
		})

	}

	RespondJSON(ctx, w, rsq, http.StatusOK)

}
