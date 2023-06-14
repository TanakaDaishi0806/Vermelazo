package service

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type UserRegister interface {
	RegisterUser(ctx context.Context, requ *entity.User) error
}

type UserGetter interface {
	GetUser(ctx context.Context, stuendtID string) (*entity.User, error)
}

type ClubMatchAdd interface {
	AddClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error
}

type ClubMatchReleasedSwitch interface {
	SwitchClubMatchReleased(ctx context.Context, id entity.ClubMatchID, b bool) (entity.ClubMatchs, error)
}
type ParticipantAdd interface {
	AddParticipant(ctx context.Context, p *entity.Paticipant) (entity.ClubMatchs, error)
}

type ParticipantDelete interface {
	DeleteParticipant(ctx context.Context, p *entity.Paticipant) (entity.ClubMatchs, error)
}

type ListParticipant interface {
	ListParticipant(ctx context.Context, uid entity.UserId) (entity.ClubMatchs, error)
}
