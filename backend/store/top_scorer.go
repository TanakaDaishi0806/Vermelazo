package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type TopScorerRepository struct {
	DBExc Execer
	DBQry Queryer
}

func (tsr *TopScorerRepository) ListTopScorer(ctx context.Context, cmid entity.ClubMatchID) (entity.TopScorers, error) {
	sql := `select t.name,t.furigana,t.goal_num 
			from (select u.name,u.furigana,count(*) as goal_num 
				from point_getter pg 
				left join users u on pg.user_id=u.user_id 
				where pg.club_match_id=$1 
				group by u.name,u.furigana) t 
			where t.goal_num=
				(select Max(goal_num) 
				from (select count(*) as goal_num 
					from point_getter pg 
					where pg.club_match_id=$2 
					group by user_id) sub)`

	l := []*entity.TopScorer{}
	if err := tsr.DBQry.SelectContext(ctx, &l, sql, cmid, cmid); err != nil {
		return nil, err
	}

	return l, nil
}
