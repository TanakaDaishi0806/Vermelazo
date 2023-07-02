package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type VoteKind struct {
	Repo KindVote
}

func (vk *VoteKind) VoteKind(ctx context.Context, cmid entity.ClubMatchID) (entity.VoteKindNums, error) {
	uid, ok := auth.GetUserID(ctx)

	if !ok {
		return nil, fmt.Errorf("cannot get userid")
	}

	lists, err := vk.Repo.VoteKind(ctx, cmid, uid)

	if err != nil {
		return nil, err
	}

	return lists, nil
}
