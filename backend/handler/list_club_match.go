package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListClubMatch struct {
	Repo ClubMatchList
}

type list struct {
	ID    entity.ClubMatchID `json:"club_match_num"`
	Year  int                `json:"year"`
	Month int                `json:"month"`
	Day   int                `json:"day"`
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
			ID:    l.ID,
			Year:  l.Year,
			Month: l.Month,
			Day:   l.Day,
		})

	}

	RespondJSON(ctx, w, rsq, http.StatusOK)
}
