package handler

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ClubMatchAdd interface {
	AddClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error
}

type ClubMatchList interface {
	ListClubMatch(ctx context.Context) (entity.ClubMatchs, error)
}

type ClubMatchChange interface {
	ChangeClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error
}
type ClubMatchDelete interface {
	DeleteClubMatch(ctx context.Context, id entity.ClubMatchID) error
}
