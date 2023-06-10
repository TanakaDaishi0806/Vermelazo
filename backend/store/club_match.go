package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type AddClubMatch struct {
	DB Execer
}

type ListClubMatch struct {
	DB Queryer
}

type ChangeClubMatch struct {
	DB Execer
}

type DeleteClubMatch struct {
	DB Execer
}

func (acm *AddClubMatch) AddClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error {
	sql := `INSERT INTO club_match (year,month,day,title) VALUES (?,?,?,?)`
	result, err := acm.DB.ExecContext(ctx, sql, reqcm.Year, reqcm.Month, reqcm.Day, reqcm.Title)
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
	sql := `select * from club_match`

	lists := entity.ClubMatchs{}

	if err := lcm.DB.SelectContext(ctx, &lists, sql); err != nil {
		return nil, err
	}

	return lists, nil

}

func (ccm *ChangeClubMatch) ChangeClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error {
	sql := `update club_match set year=?,month=?,day=?,title=? where club_match_id=?`
	_, err := ccm.DB.ExecContext(ctx, sql, reqcm.Year, reqcm.Month, reqcm.Day, reqcm.Title, reqcm.ID)
	if err != nil {
		return err
	}

	return nil
}

func (dcm *DeleteClubMatch) DeleteClubMatch(ctx context.Context, id entity.ClubMatchID) error {
	sql := `delete from club_match where club_match_id=?`

	_, err := dcm.DB.ExecContext(ctx, sql, id)
	if err != nil {
		return err
	}

	return nil

}
