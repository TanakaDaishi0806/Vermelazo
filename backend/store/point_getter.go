package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type PointGetterRepository struct {
	DBExc Execer
	DBQry Queryer
}

func (pgr *PointGetterRepository) AddPointGetter(ctx context.Context, pg *entity.PointGetter) error {
	sql := `insert into point_getter (match_id,team_id,user_id,club_match_id) values ($1,$2,$3,$4)`
	// sql1 := `select user_id from team_member where club_match_id=$`
	// sql2 := `select count(*) from point_getter where user_id=$ group by user_id`
	// sql3 := `update users set goal_num=$ where user_id=$`

	_, err := pgr.DBExc.ExecContext(ctx, sql, pg.MatchID, pg.TeamID, pg.UserID, pg.ClubMatchID)

	if err != nil {
		return err
	}

	sql2 := `select point_id from point_getter ORDER BY point_id DESC LIMIT 1`
	var pid int64
	if err := pgr.DBQry.GetContext(ctx, &pid, sql2); err != nil {
		return err
	}
	pg.PointID = entity.PointID(pid)

	// uid := []int{}
	// gnum := []int{}

	// if err := pgr.DBQry.SelectContext(ctx, &uid, sql1, pg.ClubMatchID); err != nil {
	// 	return err
	// }

	// for _, id := range uid {
	// 	if err := pgr.DBQry.SelectContext(ctx, &gnum, sql2, id); err != nil {
	// 		return err
	// 	}
	// 	if len(gnum) == 1 {
	// 		_, err := pgr.DBExc.ExecContext(ctx, sql3, gnum[0], id)
	// 		if err != nil {
	// 			return err
	// 		}
	// 	} else {
	// 		_, err := pgr.DBExc.ExecContext(ctx, sql3, 0, id)
	// 		if err != nil {
	// 			return err
	// 		}
	// 	}

	// }

	return nil
}

func (pgr *PointGetterRepository) ListPointGetter(ctx context.Context, mid entity.MatchID, tid entity.TeamID) (entity.Teams, error) {
	sql := `select pg.team_id,pg.user_id,pg.club_match_id,u.name,u.furigana,u.position,u.experience from point_getter pg left join users u on  pg.user_id=u.user_id where pg.match_id=$1 and pg.team_id=$2`

	l := entity.Teams{}

	if err := pgr.DBQry.SelectContext(ctx, &l, sql, mid, tid); err != nil {
		return nil, err
	}

	return l, nil
}

func (pgr *PointGetterRepository) DeletePointGetter(ctx context.Context, mid entity.MatchID) error {
	sql := `delete from point_getter where match_id=$1`

	_, err := pgr.DBExc.ExecContext(ctx, sql, mid)

	if err != nil {
		return err
	}

	return nil

}
