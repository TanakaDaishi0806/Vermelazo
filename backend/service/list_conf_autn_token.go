package service

import (
	"context"
	"os"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/store"
)

type ListConfAuthToken struct{}

func (lcat *ListConfAuthToken) ListConfAuthToken(ctx context.Context) error {
	to := os.Getenv("FROM_MAILADDRESS")
	if err := store.SendMail(ctx, to, "Vermelazoのメール送信機能の確認", "正常にメールを送信できました"); err != nil {
		return err
	}
	return nil

}
