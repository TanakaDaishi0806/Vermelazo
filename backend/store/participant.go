package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type AddParticipant struct {
	DB Execer
}

func (ap *AddParticipant) AddParticipant(ctx context.Context, p *entity.Paticipant) error {
	sql := `INSERT INTO participant (club_match_id,user_id) VALUES (?,?)`

	result, err := ap.DB.ExecContext(ctx, sql, p.ClubMatchID, p.UserID)

	if err != nil {
		return err
	}

	id, err := result.LastInsertId()

	if err != nil {
		return err
	}

	p.ID = entity.PaticipantID(id)

	return nil
}
