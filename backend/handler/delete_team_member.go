package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type DeleteTeamMember struct {
	Service DeleteTeamMemberService
}

func (dtm *DeleteTeamMember) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	cmid, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := dtm.Service.DeleteTeamMember(ctx, cmid)

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
			IsCreateTeam:   l.IsCreateTeam,
		})
	}

	RespondJSON(ctx, w, rsq, http.StatusOK)

}
