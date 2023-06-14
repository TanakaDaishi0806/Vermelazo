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

type plist struct {
	ID            entity.ClubMatchID `json:"club_match_id"`
	Year          int                `json:"year"`
	Month         int                `json:"month"`
	Day           int                `json:"day"`
	VoteYear      int                `json:"vote_year"`
	VoteMonth     int                `json:"vote_month"`
	VoteDay       int                `json:"vote_day"`
	Title         string             `json:"title"`
	IsReleased    bool               `json:"is_released"`
	IsParticipant bool               `json:"is_participant"`
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

	rsq := []plist{}

	for _, l := range lists {
		rsq = append(rsq, plist{
			ID:            l.ID,
			Year:          l.Year,
			Month:         l.Month,
			Day:           l.Day,
			VoteYear:      l.VoteYear,
			VoteMonth:     l.VoteMonth,
			VoteDay:       l.VoteDay,
			Title:         l.Title,
			IsReleased:    l.IsReleased,
			IsParticipant: l.IsParticipant,
		})

	}

	RespondJSON(ctx, w, rsq, http.StatusOK)

}
