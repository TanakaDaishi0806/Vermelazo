package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type DeleteTeamMember struct {
	Repo TeamMemberDelete
}

func (dtm *DeleteTeamMember) DeleteTeamMember(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error) {
	uid, ok := auth.GetUserID(ctx)

	if !ok {
		return nil, fmt.Errorf("user_id not found")
	}

	list, err := dtm.Repo.DeleteTeamMember(ctx, cmid, uid)

	if err != nil {
		return nil, err
	}
	return list, nil
}
