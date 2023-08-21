package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"golang.org/x/crypto/bcrypt"
)

type ChangeUserPassword struct {
	Repo UserPasswordChange
}

func (cup *ChangeUserPassword) ChangeUserPassword(ctx context.Context, p string) error {
	uid, ok := auth.GetUserID(ctx)

	if !ok {
		return fmt.Errorf("user_id not found")
	}

	hpw, err := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)

	if err != nil {
		return fmt.Errorf("cannot hash password: %w", err)
	}
	p = string(hpw)

	if err := cup.Repo.ChangeUserPassword(ctx, uid, p); err != nil {
		return err
	}

	return nil

}
