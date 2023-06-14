package handler

import (
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type DeleteParticipant struct {
	Service DeleteParticipantService
}

func (dp *DeleteParticipant) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	cmid, err := entity.StrTOClubMatchID(r)
	if err != nil {
		RespondJSON(ctx, w, ErrResponse{
			Message: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	lists, err := dp.Service.DeleteParticipant(ctx, cmid)

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
