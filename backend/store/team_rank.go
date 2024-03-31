package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type TeamRankRepository struct {
	DBExc Execer
	DBQry Queryer
}

func (trr *TeamRankRepository) ListTeamRank(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamRanks, error) {
	sql := `select * from team_rank where club_match_id=$1 order by point desc,win_num desc,goal_num desc`

	l := entity.TeamRanks{}
	if err := trr.DBQry.SelectContext(ctx, &l, sql, cmid); err != nil {
		return nil, err
	}

	return l, nil
}
