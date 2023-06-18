package service

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type CreateTeam struct {
	Repo TeamCreate
}

func (ct *CreateTeam) CreateTeam(ctx context.Context, cti *entity.CreateTeamInfo) (entity.EachTeams, error) {
	lid, err := ct.Repo.ResisterTeamName(ctx, cti)

	if err != nil {
		return nil, err
	}

	lists, err := ct.Repo.OrderParticipant(ctx, cti.ClubMatchID)

	if err != nil {
		return nil, err
	}

	for i := 0; i < len(lists); i++ {
		j := i % cti.TeamNum
		lists[i].ID = lid[j]
	}

	rsp := make(entity.EachTeams, cti.TeamNum)

	for i := 0; i < cti.TeamNum; i++ {
		for j := i; j < len(lists); j += cti.TeamNum {
			rsp[i] = append(rsp[i], lists[j])
		}

	}

	err = ct.Repo.ResisterTeamMember(ctx, lists)
	if err != nil {
		return nil, err
	}

	return rsp, nil

}
