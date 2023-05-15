package handler

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type RegisterUserService interface {
	RegisterUser(ctx context.Context, requ *entity.User) (*entity.User, error)
}
