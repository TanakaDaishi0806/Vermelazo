package handler

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type RegisterUserService interface {
	RegisterUser(ctx context.Context, requ *entity.User) (*entity.User, error)
}

type LoginService interface {
	Login(ctx context.Context, studentID string, pw string) (string, error)
}

type SwitchClubMatchReleasedService interface {
	SwitchClubMatchReleased(ctx context.Context, id entity.ClubMatchID, rbool bool) (entity.ClubMatchs, error)
}

type AddParticipantService interface {
	AddParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error)
}

type ListClubMatchUsersService interface {
	ListClubMatchUsers(ctx context.Context) (entity.ClubMatchs, error)
}

type DeleteParticipantService interface {
	DeleteParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error)
}
