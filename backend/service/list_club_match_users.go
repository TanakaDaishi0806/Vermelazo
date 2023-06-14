package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListClubMatchUsers struct {
	Repo ListParticipant
}

func (lcmu *ListClubMatchUsers) ListClubMatchUsers(ctx context.Context) (entity.ClubMatchs, error) {
	uid, ok := auth.GetUserID(ctx)

	if !ok {
		return nil, fmt.Errorf("cannot get userid")
	}

	l, err := lcmu.Repo.ListParticipant(ctx, uid)

	if err != nil {
		return nil, err
	}

	return l, err
}
