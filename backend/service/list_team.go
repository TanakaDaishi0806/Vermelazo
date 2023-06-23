package service

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListTeam struct {
	Repo TeamList
}

func (lt *ListTeam) ListTeam(ctx context.Context, cmid entity.ClubMatchID) (entity.EachTeams, error) {

	lists, err := lt.Repo.OrderTeams(ctx, cmid)

	if err != nil {
		return nil, err
	}

	tnum, err := lt.Repo.GetTeamNum(ctx, cmid)

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
