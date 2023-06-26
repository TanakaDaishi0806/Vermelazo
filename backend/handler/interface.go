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
	DeleteClubMatch(ctx context.Context, id entity.ClubMatchID) (entity.ClubMatchs, error)
}

type MatchList interface {
	ListMatch(ctx context.Context, cmid entity.ClubMatchID) (entity.Matchs, error)
}

type ScoreAdd interface {
	AddScore(ctx context.Context, m *entity.Match) error
}
