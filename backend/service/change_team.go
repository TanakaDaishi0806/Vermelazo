package service

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ChangeTeam struct {
	Repo TeamChange
}

func (ct *ChangeTeam) ChangeTeam(ctx context.Context, ctm *entity.ChangeTeamMember) (entity.EachTeams, error) {
	if err := ct.Repo.ChangeTeamMember(ctx, ctm); err != nil {
		return nil, err
	}

	lists, err := ct.Repo.OrderTeams(ctx, ctm.ClubMatchID)

	if err != nil {
		return nil, err
	}

	tnum, err := ct.Repo.GetTeamNum(ctx, ctm.ClubMatchID)

	if err != nil {
		return nil, err
	}

	rsp := make(entity.EachTeams, tnum)

	var tid int = int(lists[0].ID)
	var k int = 0

	for i := 0; i < tnum; i++ {
		for j := k; j < len(lists) && tid == int(lists[j].ID); j++ {
			tid = int(lists[j].ID)
			rsp[i] = append(rsp[i], lists[j])
			k++
		}
		if k < len(lists) {
			tid = int(lists[k].ID)
		}

	}

	return rsp, nil

}
