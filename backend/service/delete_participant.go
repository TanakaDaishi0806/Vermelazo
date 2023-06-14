package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type DeleteParticipant struct {
	Repo ParticipantDelete
}

func (dp *DeleteParticipant) DeleteParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.PaticipantClubMatchs, error) {
	uid, ok := auth.GetUserID(ctx)

	if !ok {
		return nil, fmt.Errorf("user_id not found")
	}

	p := &entity.Paticipant{
		ClubMatchID: cmid,
		UserID:      uid,
	}

	list, err := dp.Repo.DeleteParticipant(ctx, p)

	if err != nil {
		return nil, err
	}
	return list, nil
}
