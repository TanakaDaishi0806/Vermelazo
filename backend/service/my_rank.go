package service

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type MyRank struct {
	Repo ListMyRank
}

func (mr *MyRank) MyRank(ctx context.Context) (*entity.MyRank, error) {
	uid, ok := auth.GetUserID(ctx)
	if !ok {
		return nil, fmt.Errorf("cannot get userID")
	}

	lists, err := mr.Repo.ListMyRank(ctx, uid)
	if err != nil {
		return nil, err
	}

	return lists, nil

}
