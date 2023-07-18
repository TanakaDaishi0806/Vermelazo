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
	sql1 := `INSERT INTO participant (club_match_id,user_id) VALUES (?,?)`
	sql2 := `UPDATE club_match SET participant_num = participant_num + 1 WHERE club_match_id = ?`

	result, err := ap.DBExc.ExecContext(ctx, sql1, p.ClubMatchID, p.UserID)

	if err != nil {
		return nil, err
	}

	_, err = ap.DBExc.ExecContext(ctx, sql2, p.ClubMatchID)

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
	sql2 := `UPDATE club_match SET participant_num = participant_num - 1 WHERE club_match_id = ?`

	result, err := dp.DBExc.ExecContext(ctx, sql, p.ClubMatchID, p.UserID)

	if err != nil {
		return nil, err
	}

	_, err = dp.DBExc.ExecContext(ctx, sql2, p.ClubMatchID)

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
	cm.participant_num,
	cm.is_finish,
	cm.is_add_match,
	cm.is_create_team,
    CASE
        WHEN p.club_match_id IS NOT NULL THEN true
        ELSE false
    END AS is_participant
	
FROM
    club_match cm
LEFT JOIN
    participant p ON cm.club_match_id = p.club_match_id AND p.user_id = ?`

	l := entity.ClubMatchs{}

	if err := lp.DB.SelectContext(ctx, &l, sql, uid); err != nil {
		return nil, err
	}

	return l, nil

}
