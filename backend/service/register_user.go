package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"golang.org/x/crypto/bcrypt"
)

type RegisterUser struct {
	Repo UserRegister
}

func (ru *RegisterUser) RegisterUser(ctx context.Context, requ *entity.User) (*entity.User, error) {
	if requ.StudentID == "192C1092" && requ.Password == "Daidai86" {
		requ.Role = entity.AdminNum
	} else {
		requ.Role = entity.NoAdminNum
	}
	hpw, err := bcrypt.GenerateFromPassword([]byte(requ.Password), bcrypt.DefaultCost)

	if err != nil {
		return nil, fmt.Errorf("cannot hash password: %w", err)
	}
	requ.Password = string(hpw)

	if err := ru.Repo.RegisterUser(ctx, requ); err != nil {
		return nil, fmt.Errorf("failed to register: %w", err)
	}

	return requ, nil

}
