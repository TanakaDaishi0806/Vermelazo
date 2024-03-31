package store

import (
	"context"
	"fmt"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type MatchRepository struct {
	DBExc Execer
	DBQry Queryer
}

func (mr *MatchRepository) GetTeamList(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamIDs, error) {
	sql := `select team_id from team where club_match_id=$1`

	l := entity.TeamIDs{}

	if err := mr.DBQry.SelectContext(ctx, &l, sql, cmid); err != nil {
		return nil, err
	}

	return l, nil
}

func (mr *MatchRepository) AddMatch(ctx context.Context, mlist entity.Matchs) error {
	sql2 := `delete from match_mom where club_match_id=$1`
	sql3 := `delete from match_mom where club_match_id=$1`
	sql4 := `delete from my_team_mom where club_match_id=$1`
	sql5 := `delete from point_getter where club_match_id=$1`
	sql6 := `delete from position_mom where club_match_id=$1`
	sql7 := `delete from match_vote where club_match_id=$1`
	sql8 := `delete from matchs where club_match_id=$1`
	sql := `insert into matchs (team_id_a,team_id_b,score_a,score_b,club_match_id) values `
	sql1 := `update club_match set is_add_match=true where club_match_id=$1`
	sql9 := `select m.match_id,m.club_match_id,tm.user_id from team_member tm left join matchs m on tm.club_match_id=m.club_match_id where tm.club_match_id=$1`
	sql10 := `insert into match_vote (club_match_id,match_id,user_id) values `
	sql11 := `select user_id,count(*) as count from point_getter pg where club_match_id=$1 group by user_id`
	sql12 := `update users set goal_num=goal_num-$1 where user_id=$2`
	sql13 := `update team_rank set point=0,match_num=0,win_num=0,draw_num=0,lose_num=0,goal_num=0,is_last_rank=false where club_match_id=$1`

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
	var num int = 1
	for _, l := range mlist {
		sql += fmt.Sprintf("($%d, $%d, $%d, $%d, $%d), ", num, num+1, num+2, num+3, num+4)
		values = append(values, l.TeamIDA, l.TeamIDB, -1, -1, l.ClubMatchID)
		num += 5
	}
	sql = sql[:len(sql)-2]
	_, err = mr.DBExc.ExecContext(ctx, sql, values...)
	if err != nil {
		return err
	}

	sql14 := `select match_id from matchs ORDER BY match_id DESC LIMIT 1`
	var lastId int64
	if err := mr.DBQry.GetContext(ctx, &lastId, sql14); err != nil {
		return err
	}

	for i, l := range mlist {
		l.MatchID = entity.MatchID(lastId - int64(i))
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

	var values2 []interface{}
	num = 1
	for _, l := range lists {
		sql10 += fmt.Sprintf("($%d, $%d, $%d), ", num, num+1, num+2)
		values2 = append(values2, l.ClubMatchID, l.MatchID, l.UserID)
		num += 3
	}

	sql10 = sql10[:len(sql10)-2]
	_, err = mr.DBExc.ExecContext(ctx, sql10, values2...)
	if err != nil {
		return err
	}

	return nil
}

func (mr *MatchRepository) ListMatch(ctx context.Context, cmid entity.ClubMatchID) (entity.Matchs, error) {
	sql := `select * from matchs where club_match_id=$1 order by match_id`

	l := entity.Matchs{}

	if err := mr.DBQry.SelectContext(ctx, &l, sql, cmid); err != nil {
		return nil, err
	}

	return l, nil
}

func (mr *MatchRepository) AddScore(ctx context.Context, m *entity.Match) error {
	sql2 := `select * from matchs where match_id=$1`
	sql := `update matchs set score_a=$1,score_b=$2,is_resister=$3 where match_id=$4`
	sql1 := `update team_rank set point=point+$1,match_num=match_num+1,
	win_num=win_num+$2,draw_num=draw_num+$3,lose_num=lose_num+$4,goal_num=goal_num+$5 
	where team_id=$6 and club_match_id=$7`
	sql3 := `update team_rank set point=point-$1,match_num=match_num-1,
	win_num=win_num-$2,draw_num=draw_num-$3,lose_num=lose_num-$4,goal_num=goal_num-$5
	where team_id=$6 and club_match_id=$7`

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
