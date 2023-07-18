package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type MyRankRepository struct {
	DBExc Execer
	DBQry Queryer
}

func (mrr *MyRankRepository) ListMyRank(ctx context.Context, uid entity.UserId) (*entity.MyRank, error) {
	sql1 := `select count(*)+1 as rank_all from users where point>(select point from users where user_id=?)`
	sql2 := `select count(*) as total_all from users`
	sql3 := `select count(*)+1 as rank_position from users where position=(select position from users where user_id=?) and point>(select point from users where user_id=?)`
	sql4 := `select count(*) as total_position from users where position=(select position from users where user_id=?)`
	sql5 := `select count(*)+1 as rank_experience from users where experience=(select experience from users where user_id=?) and point>(select point from users where user_id=?)`
	sql6 := `select count(*) as total_experience from users where experience=(select experience from users where user_id=?)`
	sql7 := `select goal_num from users where user_id=?`
	sql8 := `select count(*)+1 as rank_goal from users where goal_num>(select goal_num from users where user_id=?)`
	sql9 := `select is_finish from club_match limit 1`

	var ra []int
	var ta []int
	var rp []int
	var tp []int
	var re []int
	var te []int
	var gn []int
	var rg []int

	if err := mrr.DBQry.SelectContext(ctx, &ra, sql1, uid); err != nil {
		return nil, err
	}
	if len(ra) == 0 {
		ra = append(ra, -1)
	}
	if err := mrr.DBQry.SelectContext(ctx, &ta, sql2); err != nil {
		return nil, err
	}
	if len(ta) == 0 {
		ta = append(ta, -1)
	}
	if err := mrr.DBQry.SelectContext(ctx, &rp, sql3, uid, uid); err != nil {
		return nil, err
	}
	if len(rp) == 0 {
		rp = append(rp, -1)
	}
	if err := mrr.DBQry.SelectContext(ctx, &tp, sql4, uid); err != nil {
		return nil, err
	}
	if len(tp) == 0 {
		tp = append(tp, -1)
	}
	if err := mrr.DBQry.SelectContext(ctx, &re, sql5, uid, uid); err != nil {
		return nil, err
	}
	if len(re) == 0 {
		re = append(re, -1)
	}
	if err := mrr.DBQry.SelectContext(ctx, &te, sql6, uid); err != nil {
		return nil, err
	}
	if len(te) == 0 {
		te = append(te, -1)
	}
	if err := mrr.DBQry.SelectContext(ctx, &gn, sql7, uid); err != nil {
		return nil, err
	}
	if len(gn) == 0 {
		gn = append(gn, -1)
	}
	if err := mrr.DBQry.SelectContext(ctx, &rg, sql8, uid); err != nil {
		return nil, err
	}
	if len(rg) == 0 {
		rg = append(rg, -1)
	}
	var b []bool
	if err := mrr.DBQry.SelectContext(ctx, &b, sql9); err != nil {
		return nil, err
	}
	if len(b) == 0 {
		b = append(b, false)
	}

	lists := entity.MyRank{
		RankAll:         ra[0],
		TotalAll:        ta[0],
		RankPosition:    rp[0],
		TotalPosition:   tp[0],
		RankExperience:  re[0],
		TotalExperience: te[0],
		GoalNum:         gn[0],
		RankGoal:        rg[0],
		TotalGoal:       ta[0],
		IsReleased:      b[0],
	}

	return &lists, nil

}
