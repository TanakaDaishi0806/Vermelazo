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
	sql2 := `delete from match_mom where club_match_id=?`
	sql3 := `delete from match_mom where club_match_id=?`
	sql4 := `delete from my_team_mom where club_match_id=?`
	sql5 := `delete from point_getter where club_match_id=?`
	sql6 := `delete from position_mom where club_match_id=?`
	sql7 := `delete from match_vote where club_match_id=?`
	sql8 := `delete from matchs where club_match_id=?`
	sql := `insert into matchs (team_id_a,team_id_b,score_a,score_b,club_match_id) values `
	sql1 := `update club_match set is_add_match=true where club_match_id=?`
	sql9 := `select m.match_id,m.club_match_id,tm.user_id from team_member tm left join matchs m on tm.club_match_id=m.club_match_id where tm.club_match_id=?`
	sql10 := `insert into match_vote (club_match_id,match_id,user_id) values (?,?,?)`
	sql11 := `select user_id,count(*) as count from point_getter pg where club_match_id=? group by user_id`
	sql12 := `update users set goal_num=goal_num-? where user_id=?`
	sql13 := `update team_rank set point=0,match_num=0,win_num=0,draw_num=0,lose_num=0,goal_num=0,is_last_rank=false where club_match_id=?`

	count := entity.PreGoalNums{}
	if err := mr.DBQry.SelectContext(ctx, &count, sql11, mlist[0].ClubMatchID); err != nil {
		return err
	}

	for _, l := range count {
		_, err := mr.DBExc.ExecContext(ctx, sql12, l.Count, l.UserID)
		if err != nil {
			return err
		}

	}

	_, err := mr.DBExc.ExecContext(ctx, sql2, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}
	_, err = mr.DBExc.ExecContext(ctx, sql3, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}
	_, err = mr.DBExc.ExecContext(ctx, sql4, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}
	_, err = mr.DBExc.ExecContext(ctx, sql5, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}
	_, err = mr.DBExc.ExecContext(ctx, sql6, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}
	_, err = mr.DBExc.ExecContext(ctx, sql7, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}
	_, err = mr.DBExc.ExecContext(ctx, sql8, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}

	var values []interface{}

	for _, l := range mlist {
		sql += "(?,?,?,?,?), "
		values = append(values, l.TeamIDA, l.TeamIDB, -1, -1, l.ClubMatchID)
	}
	sql = sql[:len(sql)-2]
	result, err := mr.DBExc.ExecContext(ctx, sql, values...)
	if err != nil {
		return err
	}

	lastId, err := result.LastInsertId()
	if err != nil {
		return err
	}

	for i, l := range mlist {
		l.MatchID = entity.MatchID(lastId + int64(i))
	}

	_, err = mr.DBExc.ExecContext(ctx, sql1, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}

	_, err = mr.DBExc.ExecContext(ctx, sql13, mlist[0].ClubMatchID)
	if err != nil {
		return err
	}

	lists := entity.MatchVotes{}
	if err := mr.DBQry.SelectContext(ctx, &lists, sql9, mlist[0].ClubMatchID); err != nil {
		return err
	}

	for _, l := range lists {
		_, err := mr.DBExc.ExecContext(ctx, sql10, l.ClubMatchID, l.MatchID, l.UserID)
		if err != nil {
			return err
		}

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
	sql2 := `select * from matchs where match_id=?`
	sql := `update matchs set score_a=?,score_b=?,is_resister=? where match_id=?`
	sql1 := `update team_rank set point=point+?,match_num=match_num+1,
	win_num=win_num+?,draw_num=draw_num+?,lose_num=lose_num+?,goal_num=goal_num+? 
	where team_id=? and club_match_id=?`
	sql3 := `update team_rank set point=point-?,match_num=match_num-1,
	win_num=win_num-?,draw_num=draw_num-?,lose_num=lose_num-?,goal_num=goal_num-? 
	where team_id=? and club_match_id=?`

	prematch := entity.Matchs{}

	if err := mr.DBQry.SelectContext(ctx, &prematch, sql2, m.MatchID); err != nil {
		return err
	}

	_, err := mr.DBExc.ExecContext(ctx, sql, m.ScoreA, m.ScoreB, true, m.MatchID)

	if err != nil {
		return err
	}

	var point int = 0
	var win int = 0
	var draw int = 0
	var lose int = 0

	if prematch[0].ScoreA != -1 {

		//TeamA
		if prematch[0].ScoreA > prematch[0].ScoreB {
			point = prematch[0].ScoreA - prematch[0].ScoreB
			win = 1
		} else if prematch[0].ScoreA == prematch[0].ScoreB {
			point = 0
			draw = 1
		} else {
			point = 0
			lose = 1
		}

		_, err = mr.DBExc.ExecContext(ctx, sql3, point, win, draw, lose, prematch[0].ScoreA, prematch[0].TeamIDA, prematch[0].ClubMatchID)

		if err != nil {
			return err
		}

		point = 0
		win = 0
		draw = 0
		lose = 0

		//TeamB
		if prematch[0].ScoreA < prematch[0].ScoreB {
			point = prematch[0].ScoreB - prematch[0].ScoreA
			win = 1
		} else if prematch[0].ScoreA == prematch[0].ScoreB {

			draw = 1
		} else {
			lose = 1
		}
		_, err = mr.DBExc.ExecContext(ctx, sql3, point, win, draw, lose, prematch[0].ScoreB, prematch[0].TeamIDB, prematch[0].ClubMatchID)

		if err != nil {
			return err
		}
	}

	point = 0
	win = 0
	draw = 0
	lose = 0

	//TeamA
	if m.ScoreA > m.ScoreB {
		point = m.ScoreA - m.ScoreB
		win = 1
	} else if m.ScoreA == m.ScoreB {
		point = 0
		draw = 1
	} else {
		point = 0
		lose = 1
	}

	_, err = mr.DBExc.ExecContext(ctx, sql1, point, win, draw, lose, m.ScoreA, m.TeamIDA, m.ClubMatchID)

	if err != nil {
		return err
	}

	point = 0
	win = 0
	draw = 0
	lose = 0

	//TeamB
	if m.ScoreA < m.ScoreB {
		point = m.ScoreB - m.ScoreA
		win = 1
	} else if m.ScoreA == m.ScoreB {

		draw = 1
	} else {
		lose = 1
	}
	_, err = mr.DBExc.ExecContext(ctx, sql1, point, win, draw, lose, m.ScoreB, m.TeamIDB, m.ClubMatchID)

	if err != nil {
		return err
	}

	return nil
}
