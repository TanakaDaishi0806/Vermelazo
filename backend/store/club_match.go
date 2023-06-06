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

func (acm *AddClubMatch) AddClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error {
	sql := `INSERT INTO club_match_data (year,month,day) VALUES (?,?,?)`
	result, err := acm.DB.ExecContext(ctx, sql, reqcm.Year, reqcm.Month, reqcm.Day)
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
	sql := `select * from club_match_data`

	lists := entity.ClubMatchs{}

	if err := lcm.DB.SelectContext(ctx, &lists, sql); err != nil {
		return nil, err
	}

	return lists, nil

}
