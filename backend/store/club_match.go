package store

import (
	"context"
	"log"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type AddClubMatch struct {
	DB Execer
}

type ListClubMatch struct {
	DB Queryer
}

type ListClubMatchUsers struct {
	DB Queryer
}

type ChangeClubMatch struct {
	DB Execer
}

type DeleteClubMatch struct {
	DBExc Execer
	DBQry Queryer
}

type SwitchClubMatchReleased struct {
	DBExc Execer
	DBQry Queryer
}

func (acm *AddClubMatch) AddClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error {
	sql := `INSERT INTO club_match (year,month,day,vote_year,vote_month,vote_day,title) VALUES (?,?,?,?,?,?,?)`
	result, err := acm.DB.ExecContext(ctx, sql, reqcm.Year, reqcm.Month, reqcm.Day, reqcm.VoteYear, reqcm.VoteMonth, reqcm.VoteDay, reqcm.Title)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	reqcm.ID = entity.ClubMatchID(id)
	return nil
}

func (lcm *ListClubMatch) ListClubMatch(ctx context.Context) (entity.ClubMatchs, error) {
	sql := `SELECT
    club_match.club_match_id,
    club_match.year,
    club_match.month,
    club_match.day,
    club_match.vote_year,
    club_match.vote_month,
    club_match.vote_day,
    club_match.title,
    club_match.is_released,
    COUNT(participant.club_match_id) AS participant_num
FROM
    club_match
LEFT JOIN
    participant ON club_match.club_match_id = participant.club_match_id
GROUP BY
    club_match.club_match_id`

	lists := entity.ClubMatchs{}

	if err := lcm.DB.SelectContext(ctx, &lists, sql); err != nil {
		return nil, err
	}

	return lists, nil

}

func (lcmu *ListClubMatchUsers) ListClubMatchUsers(ctx context.Context) (entity.ClubMatchs, error) {
	sql := `SELECT
    club_match.club_match_id,
    club_match.year,
    club_match.month,
    club_match.day,
    club_match.vote_year,
    club_match.vote_month,
    club_match.vote_day,
    club_match.title,
    club_match.is_released,
    COUNT(participant.club_match_id) AS participant_num
FROM
    club_match
LEFT JOIN
    participant ON club_match.club_match_id = participant.club_match_id
GROUP BY
    club_match.club_match_id`

	lists := entity.ClubMatchs{}
	log.Print(lists)

	if err := lcmu.DB.SelectContext(ctx, &lists, sql); err != nil {
		return nil, err
	}

	return lists, nil

}

func (ccm *ChangeClubMatch) ChangeClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error {
	sql := `update club_match set year=?,month=?,day=?,vote_year=?,vote_month=?,vote_day=?,title=? where club_match_id=?`
	_, err := ccm.DB.ExecContext(ctx, sql, reqcm.Year, reqcm.Month, reqcm.Day, reqcm.VoteYear, reqcm.VoteMonth, reqcm.VoteDay, reqcm.Title, reqcm.ID)
	if err != nil {
		return err
	}

	return nil
}

func (dcm *DeleteClubMatch) DeleteClubMatch(ctx context.Context, id entity.ClubMatchID) (entity.ClubMatchs, error) {
	sql1 := `delete from participant where club_match_id=?`
	sql2 := `delete from club_match where club_match_id=?`

	_, err := dcm.DBExc.ExecContext(ctx, sql1, id)
	if err != nil {
		return nil, err
	}
	_, err = dcm.DBExc.ExecContext(ctx, sql2, id)
	if err != nil {
		return nil, err
	}

	lcm := &ListClubMatch{DB: dcm.DBQry}

	lists, err := lcm.ListClubMatch(ctx)

	if err != nil {
		return nil, err
	}

	return lists, nil

}

func (scmr *SwitchClubMatchReleased) SwitchClubMatchReleased(ctx context.Context, id entity.ClubMatchID, b bool) (entity.ClubMatchs, error) {
	sql := `update club_match set is_released=? where club_match_id=?`

	_, err := scmr.DBExc.ExecContext(ctx, sql, b, id)
	if err != nil {
		return nil, err
	}

	lcm := &ListClubMatch{DB: scmr.DBQry}

	lists, err := lcm.ListClubMatch(ctx)

	if err != nil {
		return nil, err
	}

	return lists, nil

}
