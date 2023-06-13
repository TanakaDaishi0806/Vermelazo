package service

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type SwitchClubMatchReleased struct {
	Repo ClubMatchReleasedSwitch
}

func (scmr *SwitchClubMatchReleased) SwitchClubMatchReleased(ctx context.Context, id entity.ClubMatchID, rbool bool) (entity.ClubMatchs, error) {
	rbool = !rbool

	lists, err := scmr.Repo.SwitchClubMatchReleased(ctx, id, rbool)

	if err != nil {
		return nil, err
	}
	return lists, nil
}
