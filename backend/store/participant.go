package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type AddParticipant struct {
	DBExc Execer
	DBQry Queryer
}

type DeleteParticipant struct {
	DBExc Execer
	DBQry Queryer
}

type ListParticipant struct {
	DB Queryer
}

func (ap *AddParticipant) AddParticipant(ctx context.Context, p *entity.Paticipant) (entity.ClubMatchs, error) {
	sql := `INSERT INTO participant (club_match_id,user_id) VALUES (?,?)`

	result, err := ap.DBExc.ExecContext(ctx, sql, p.ClubMatchID, p.UserID)

	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()

	if err != nil {
		return nil, err
	}

	p.ID = entity.PaticipantID(id)

	lp := &ListParticipant{DB: ap.DBQry}

	l, err := lp.ListParticipant(ctx, p.UserID)
	if err != nil {
		return nil, err
	}

	return l, nil
}

func (dp *DeleteParticipant) DeleteParticipant(ctx context.Context, p *entity.Paticipant) (entity.ClubMatchs, error) {
	sql := `delete from participant where club_match_id=? AND user_id=?`

	result, err := dp.DBExc.ExecContext(ctx, sql, p.ClubMatchID, p.UserID)

	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()

	if err != nil {
		return nil, err
	}

	p.ID = entity.PaticipantID(id)

	lp := &ListParticipant{DB: dp.DBQry}

	l, err := lp.ListParticipant(ctx, p.UserID)
	if err != nil {
		return nil, err
	}

	return l, nil
}

func (lp *ListParticipant) ListParticipant(ctx context.Context, uid entity.UserId) (entity.ClubMatchs, error) {
	sql := `SELECT
    cm.club_match_id,
    cm.year,
    cm.month,
    cm.day,
    cm.vote_year,
    cm.vote_month,
    cm.vote_day,
    cm.title,
    cm.is_released,
    CASE
        WHEN p.club_match_id IS NOT NULL THEN true
        ELSE false
    END AS is_participant,
	COUNT(p.club_match_id) AS participant_num
FROM
    club_match cm
LEFT JOIN
    participant p ON cm.club_match_id = p.club_match_id AND p.user_id = ?
GROUP BY
	cm.club_match_id`

	l := entity.ClubMatchs{}

	if err := lp.DB.SelectContext(ctx, &l, sql, uid); err != nil {
		return nil, err
	}

	return l, nil

}
