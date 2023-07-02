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
	sql := `select * from club_match`

	lists := entity.ClubMatchs{}

	if err := lcm.DB.SelectContext(ctx, &lists, sql); err != nil {
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
	sql2 := `delete from team_member where team_id in (select team_id from team where club_match_id=?)`
	sql3 := `delete from team where club_match_id=?`
	sql := `delete from club_match where club_match_id=?`

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
	_, err = dcm.DBExc.ExecContext(ctx, sql, id)
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

func (scmr *SwitchClubMatchFinish) SwitchClubMatchFinish(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error) {
	sql := `update club_match set is_finish= not is_finish where club_match_id=?`
	sql1 := `update team_rank set is_last_rank= not is_last_rank where club_match_id=?`
	sql2 := `select user_id from team_member where club_match_id=?`
	sql3 := `select coalesce(count(*),0) as count from point_getter where user_id=? and club_match_id=? group by user_id`
	sql5 := `select tr.point from team_rank tr 
	where tr.team_id=(select team_id from team_member where user_id=? and club_match_id=?)`
	sql6 := `select coalesce(count(*),0) as count from (select * from my_team_mom where user_id=? and club_match_id=? 
		union all select * from match_mom where user_id=? and club_match_id=?) sub group by sub.user_id`
	sql7 := `select coalesce(count(*)*10,0) as count from position_mom where user_id=? and club_match_id=?`
	sql8 := `update users set goal_num=?,point=point+? where user_id=?`
	sql9 := `select is_finish from club_match where club_match_id=?`

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

		if b[0] {
			addpoint = teampoint[0] + votepoint[0] + mompoint[0]
		} else {
			addpoint = -teampoint[0] - votepoint[0] - mompoint[0]
		}

		_, err = scmr.DBExc.ExecContext(ctx, sql8, goalnum[0], addpoint, uid)
		if err != nil {
			return nil, err
		}

	}

	return lists, nil

}
