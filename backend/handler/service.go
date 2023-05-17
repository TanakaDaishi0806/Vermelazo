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
