package handler

import (
	"fmt"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
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
	rsq := entity.ClubMatchs{}

	for _, l := range lists {
		fmt.Printf("club_match_type:%d", l.ClubMatchType)
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
