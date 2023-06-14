package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type AddParticipant struct {
	Repo ParticipantAdd
}

func (ap *AddParticipant) AddParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.PaticipantClubMatchs, error) {
	uid, ok := auth.GetUserID(ctx)

	if !ok {
		return nil, fmt.Errorf("user_id not found")
	}

	p := &entity.Paticipant{
		ClubMatchID: cmid,
		UserID:      uid,
	}

	list, err := ap.Repo.AddParticipant(ctx, p)

	if err != nil {
		return nil, err
	}
	return list, nil
}
