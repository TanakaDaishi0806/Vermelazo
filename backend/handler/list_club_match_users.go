package handler

import (
	"net/http"
)

type ListClubMatchUsers struct {
	Service ListClubMatchUsersService
}

func (lcmu *ListClubMatchUsers) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	lists, err := lcmu.Service.ListClubMatchUsers(ctx)
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