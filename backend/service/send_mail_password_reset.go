package service

import (
	"context"
	"os"
	"time"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/store"
)

type SendMailPasswordReset struct {
	Repo PasswordResetSendMail
}

func (smpr *SendMailPasswordReset) SendMailPasswordReset(ctx context.Context, sid string, ma string) error {

	dbma, err := smpr.Repo.GetMailAddress(ctx, sid)
	if err != nil {
		return err
	}
	if dbma != ma {
		if err := store.SendMail(ctx, ma, "Vermelazoのパスワードの変更について", "メールアドレスを確認完了しました。"); err != nil {
			return err
		}
	} else {
		url := os.Getenv("FRONT_URL")
		var b bool = true
		var token string
		for b {
			token = entity.CreateToken(8)

			rb, err := smpr.Repo.ExistToken(ctx, token)
			if err != nil {
				return err
			}
			b = !rb
		}
		// 現在の時刻を取得
		now := time.Now()

		// 30分を足す
		expirationTime := now.Add(30 * time.Minute)

		pr := &entity.PasswordReset{
			StudentID:       sid,
			ResetToken:      token,
			TokenExpiration: expirationTime,
		}

		if err := smpr.Repo.AddPasswordResetData(ctx, pr); err != nil {
			return err
		}
		if err := store.SendMail(ctx, ma, "Vermelazoのパスワードの変更について", "以下のURLにアクセスして30分以内にパスワードを変更してください.\n"+url+"/passwordreset/?token="+token); err != nil {
			return err
		}

	}

	return nil
}
