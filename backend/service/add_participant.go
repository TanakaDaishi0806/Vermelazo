package service

import (
	"context"
	"fmt"
	"log"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type AddParticipant struct {
	Repo ParticipantAdd
}

func (ap *AddParticipant) AddParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error) {
	log.Printf("unkounkounko1")
	uid, ok := auth.GetUserID(ctx)
	log.Printf("unkounkounko2")

	if !ok {
		return nil, fmt.Errorf("user_id not found")
	}

	p := &entity.Paticipant{
		ClubMatchID: cmid,
		UserID:      uid,
	}
	log.Printf("unkounkounko3")
	list, err := ap.Repo.AddParticipant(ctx, p)
	log.Printf("unkounkounko4")
	if err != nil {
		return nil, err
	}
	return list, nil
}
