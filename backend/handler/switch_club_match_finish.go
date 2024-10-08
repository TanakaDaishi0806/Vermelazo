package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type SwitchClubMatchFinish struct {
	Repo ClubMatchFinishSwitch
}

func (scmf *SwitchClubMatchFinish) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cmid, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, &ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := scmf.Repo.SwitchClubMatchFinish(ctx, cmid)

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
			ParticipantNum: l.ParticipantNum,
			IsCreateTeam:   l.IsCreateTeam,
			IsFinish:       l.IsFinish,
			ClubMatchType:  l.ClubMatchType,
		})
	}

	RespondJSON(ctx, w, rsq, http.StatusOK)

}
