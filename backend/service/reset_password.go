package service

import (
	"context"
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type ResetPassword struct {
	Repo PasswordReset
}

func (rp *ResetPassword) ResetPassword(ctx context.Context, token string, p string) error {
	pr, err := rp.Repo.GetTokenData(ctx, token)
	if err != nil {
		return err
	}

	// 現在の時刻を取得
	now := time.Now()

	if pr != nil && pr.TokenExpiration.After(now) {
		hpw, err := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)

		if err != nil {
			return fmt.Errorf("cannot hash password: %w", err)
		}
		p = string(hpw)

		if err := rp.Repo.ResetPassword(ctx, pr.StudentID, p); err != nil {
			return err
		}
		return nil

	} else {
		return fmt.Errorf("cannot get data")
	}

}
