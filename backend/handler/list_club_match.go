package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListClubMatch struct {
	Repo ClubMatchList
}

type list struct {
	ID             entity.ClubMatchID `json:"club_match_id"`
	Year           int                `json:"year"`
	Month          int                `json:"month"`
	Day            int                `json:"day"`
	VoteYear       int                `json:"vote_year"`
	VoteMonth      int                `json:"vote_month"`
	VoteDay        int                `json:"vote_day"`
	Title          string             `json:"title"`
	IsReleased     bool               `json:"is_released"`
	IsParticipant  bool               `json:"is_participant"`
	ParticipantNum int                `json:"participant_num"`
}

func (lcm *ListClubMatch) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	lists, err := lcm.Repo.ListClubMatch(ctx)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}
	rsq := []list{}

	for _, l := range lists {
		rsq = append(rsq, list{
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
		})

	}

	RespondJSON(ctx, w, rsq, http.StatusOK)
}
