package store

import (
	"context"
	"log"

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
	sql3 := `select m.match_id,m.club_match_id,tm.user_id from team_member tm left join matchs m on tm.club_match_id=m.club_match_id where tm.club_match_id=? and tm.user_id=?`
	sql4 := `insert into match_vote (club_match_id,match_id,user_id) values (?,?,?)`
	sql5 := `select count(*) from matchs where club_match_id=?`
	sql6 := `select count(*) from match_vote where club_match_id=? and user_id=?`

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
	mnum := []int{}
	if err := ap.DBQry.SelectContext(ctx, &mnum, sql5, p.ClubMatchID); err != nil {
		return nil, err
	}
	if len(mnum) == 1 {
		mvnum := []int{}
		if err := ap.DBQry.SelectContext(ctx, &mvnum, sql6, p.ClubMatchID, p.UserID); err != nil {
			return nil, err
		}

		if mnum[0] != 0 && len(mvnum) == 1 && mvnum[0] == 0 {
			lists := entity.MatchVotes{}
			if err := ap.DBQry.SelectContext(ctx, &lists, sql3, p.ClubMatchID, p.UserID); err != nil {
				return nil, err
			}
			log.Print(lists)

			for _, l := range lists {
				_, err := ap.DBExc.ExecContext(ctx, sql4, l.ClubMatchID, l.MatchID, l.UserID)
				if err != nil {
					return nil, err
				}

			}
		}

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
	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	log.Println("a")
	log.Println(id)

	_, err = dp.DBExc.ExecContext(ctx, sql2, p.ClubMatchID)

	if err != nil {
		return nil, err
	}

	id, err = result.LastInsertId()

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
