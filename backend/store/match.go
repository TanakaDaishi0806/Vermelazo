package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type MatchRepository struct {
	DBExc Execer
	DBQry Queryer
}

func (mr *MatchRepository) GetTeamList(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamIDs, error) {
	sql := `select team_id from team where club_match_id=?`

	l := entity.TeamIDs{}

	if err := mr.DBQry.SelectContext(ctx, &l, sql, cmid); err != nil {
		return nil, err
	}

	return l, nil
}

func (mr *MatchRepository) AddMatch(ctx context.Context, mlist entity.Matchs) error {
	sql := `insert into matchs (team_id_a,team_id_b,score_a,score_b,club_match_id) values (?,?,?,?,?)`

	for _, l := range mlist {
		result, err := mr.DBExc.ExecContext(ctx, sql, l.TeamIDA, l.TeamIDB, -1, -1, l.ClubMatchID)
		if err != nil {
			return err
		}
		id, err := result.LastInsertId()
		if err != nil {
			return err
		}
		l.MatchID = entity.MatchID(id)
	}

	return nil
}

func (mr *MatchRepository) ListMatch(ctx context.Context, cmid entity.ClubMatchID) (entity.Matchs, error) {
	sql := `select * from matchs where club_match_id=?`

	l := entity.Matchs{}

	if err := mr.DBQry.SelectContext(ctx, &l, sql, cmid); err != nil {
		return nil, err
	}

	return l, nil
}

func (mr *MatchRepository) AddScore(ctx context.Context, m *entity.Match) error {
	sql := `update matchs set score_a=?,score_b=? where match_id=?`

	_, err := mr.DBExc.ExecContext(ctx, sql, m.ScoreA, m.ScoreB, m.MatchID)

	if err != nil {
		return err
	}

	return nil
}
