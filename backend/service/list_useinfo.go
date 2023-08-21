package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListUserInfo struct {
	Repo UserInfoList
}

func (lui *ListUserInfo) ListUserInfo(ctx context.Context) (*entity.User, error) {
	uid, ok := auth.GetUserID(ctx)
	if !ok {
		return nil, fmt.Errorf("user_id not found")
	}
	uid = entity.UserId(uid)
	lists, err := lui.Repo.ListUserInfo(ctx, uid)
	if err != nil {
		return nil, err
	}

	return lists, nil
}
