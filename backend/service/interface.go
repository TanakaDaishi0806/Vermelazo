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
