package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"golang.org/x/crypto/bcrypt"
)

type ChangeUserInfo struct {
	Repo UserInfoChange
}

func (cui *ChangeUserInfo) ChangeUserInfo(ctx context.Context, ui *entity.User) error {
	uid, ok := auth.GetUserID(ctx)

	if !ok {
		return fmt.Errorf("user_id not found")
	}
	ui.ID = entity.UserId(uid)
	hpw, err := bcrypt.GenerateFromPassword([]byte(ui.Password), bcrypt.DefaultCost)

	if err != nil {
		return fmt.Errorf("cannot hash password: %w", err)
	}
	ui.Password = string(hpw)

	if err := cui.Repo.ChangeUserInfo(ctx, ui); err != nil {
		return err
	}

	return nil

}
