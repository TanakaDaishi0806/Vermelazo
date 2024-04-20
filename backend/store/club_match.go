package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type AddClubMatch struct {
	DBExc Execer
	DBQry Queryer
}

type ListClubMatch struct {
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

type SwitchClubMatchFinish struct {
	DBExc Execer
	DBQry Queryer
}

func (acm *AddClubMatch) AddClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error {
	sql := `INSERT INTO club_match (year,month,day,vote_year,vote_month,vote_day,title,point_times) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`

	_, err := acm.DBExc.ExecContext(ctx, sql, reqcm.Year, reqcm.Month, reqcm.Day, reqcm.VoteYear, reqcm.VoteMonth, reqcm.VoteDay, reqcm.Title, reqcm.PointTimes)
	if err != nil {
		return err
	}
	sql2 := `select club_match_id from club_match ORDER BY club_match_id DESC LIMIT 1`
	var id int64
	if err := acm.DBQry.GetContext(ctx, &id, sql2); err != nil {
		return err
	}
	reqcm.ID = entity.ClubMatchID(id)
	return nil
}

func (lcm *ListClubMatch) ListClubMatch(ctx context.Context) (entity.ClubMatchs, error) {
	sql := `select * from club_match ORDER BY club_match_id DESC`

	lists := entity.ClubMatchs{}

	if err := lcm.DB.SelectContext(ctx, &lists, sql); err != nil {
		return nil, err
	}

	return lists, nil

}

func (ccm *ChangeClubMatch) ChangeClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error {
	sql := `update club_match set year=$1,month=$2,day=$3,vote_year=$4,vote_month=$5,vote_day=$6,title=$7,point_times=$8 where club_match_id=$9`
	_, err := ccm.DB.ExecContext(ctx, sql, reqcm.Year, reqcm.Month, reqcm.Day, reqcm.VoteYear, reqcm.VoteMonth, reqcm.VoteDay, reqcm.Title, reqcm.PointTimes, reqcm.ID)
	if err != nil {
		return err
	}

	return nil
}

func (dcm *DeleteClubMatch) DeleteClubMatch(ctx context.Context, id entity.ClubMatchID) (entity.ClubMatchs, error) {
	sql1 := `delete from participant where club_match_id=$1`
	sql2 := `delete from team_member where team_id in (select team_id from team where club_match_id=$1)`
	sql3 := `delete from team_rank where club_match_id=$1`
	sql4 := `delete from match_vote where club_match_id=$1`
	sql5 := `delete from matchs where club_match_id=$1`
	sql6 := `delete from team where club_match_id=$1`
	sql7 := `delete from club_match where club_match_id=$1`

	_, err := dcm.DBExc.ExecContext(ctx, sql1, id)
	if err != nil {
		return nil, err
	}
	_, err = dcm.DBExc.ExecContext(ctx, sql2, id)
	if err != nil {
		return nil, err
	}
	_, err = dcm.DBExc.ExecContext(ctx, sql3, id)
	if err != nil {
		return nil, err
	}
	_, err = dcm.DBExc.ExecContext(ctx, sql4, id)
	if err != nil {
		return nil, err
	}
	_, err = dcm.DBExc.ExecContext(ctx, sql5, id)
	if err != nil {
		return nil, err
	}

	_, err = dcm.DBExc.ExecContext(ctx, sql6, id)
	if err != nil {
		return nil, err
	}
	_, err = dcm.DBExc.ExecContext(ctx, sql7, id)
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
	sql := `update club_match set is_released=$1 where club_match_id=$2`

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

func (scmr *SwitchClubMatchFinish) SwitchClubMatchFinish(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error) {
	sql := `update club_match set is_finish= not is_finish where club_match_id=$1`
	sql1 := `update team_rank set is_last_rank= not is_last_rank where club_match_id=$1`
	sql2 := `select user_id from team_member where club_match_id=$1 and is_exist=true`
	sql3 := `select coalesce(count(*),0) as count from point_getter where user_id=$1 and club_match_id=$2 group by user_id`
	sql5 := `select tr.point from team_rank tr 
	where tr.team_id=(select team_id from team_member where user_id=$1 and club_match_id=$2)`
	sql6 := `select coalesce(count(*),0) as count from (select * from my_team_mom where user_id=$1 and club_match_id=$2 
		union all select * from match_mom where user_id=$3 and club_match_id=$4) sub group by sub.user_id`
	sql7 := `select coalesce(count(*)*10,0) as count from position_mom where user_id=$1 and club_match_id=$2`
	sql8 := `update users set goal_num=goal_num+$1,point=point+$2 where user_id=$3`
	sql9 := `select is_finish from club_match where club_match_id=$1`
	sql10 := `select point_times from club_match where club_match_id=$1`

	_, err := scmr.DBExc.ExecContext(ctx, sql, cmid)
	if err != nil {
		return nil, err
	}

	lcm := &ListClubMatch{DB: scmr.DBQry}

	lists, err := lcm.ListClubMatch(ctx)

	if err != nil {
		return nil, err
	}

	_, err = scmr.DBExc.ExecContext(ctx, sql1, cmid)
	if err != nil {
		return nil, err
	}

	ulists := []entity.UserId{}
	if err := scmr.DBQry.SelectContext(ctx, &ulists, sql2, cmid); err != nil {
		return nil, err
	}

	b := []bool{}
	if err := scmr.DBQry.SelectContext(ctx, &b, sql9, cmid); err != nil {
		return nil, err
	}

	pt := []int{}
	if err := scmr.DBQry.SelectContext(ctx, &pt, sql10, cmid); err != nil {
		return nil, err
	}

	for _, uid := range ulists {
		goalnum := []int{}
		if err := scmr.DBQry.SelectContext(ctx, &goalnum, sql3, uid, cmid); err != nil {
			return nil, err
		}
		if len(goalnum) == 0 {
			goalnum = append(goalnum, 0)
		}

		teampoint := []int{}
		if err := scmr.DBQry.SelectContext(ctx, &teampoint, sql5, uid, cmid); err != nil {
			return nil, err
		}
		if len(teampoint) == 0 {
			teampoint = append(teampoint, 0)
		}

		votepoint := []int{}
		if err := scmr.DBQry.SelectContext(ctx, &votepoint, sql6, uid, cmid, uid, cmid); err != nil {
			return nil, err
		}
		if len(votepoint) == 0 {
			votepoint = append(votepoint, 0)
		}

		mompoint := []int{}
		if err := scmr.DBQry.SelectContext(ctx, &mompoint, sql7, uid, cmid); err != nil {
			return nil, err
		}
		if len(mompoint) == 0 {
			mompoint = append(mompoint, 0)
		}

		var addpoint int
		var addgoalnum int

		if b[0] {
			addpoint = (teampoint[0] + votepoint[0] + mompoint[0]) * pt[0]
			addgoalnum = goalnum[0]
		} else {
			addpoint = (-teampoint[0] - votepoint[0] - mompoint[0]) * pt[0]
			addgoalnum = -goalnum[0]
		}

		_, err = scmr.DBExc.ExecContext(ctx, sql8, addgoalnum, addpoint, uid)
		if err != nil {
			return nil, err
		}

	}

	return lists, nil

}
