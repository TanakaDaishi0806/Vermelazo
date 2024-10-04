package store

import (
	"context"
	"database/sql"
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
	sql := `insert into matchs (team_id_a,team_id_b,score_a,score_b,club_match_id,pk_a,pk_b,match_type) values `
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
		sql += fmt.Sprintf("($%d, $%d, $%d, $%d, $%d,$%d, $%d, $%d), ", num, num+1, num+2, num+3, num+4, num+5, num+6, num+7)
		values = append(values, l.TeamIDA, l.TeamIDB, -1, -1, l.ClubMatchID, 0, 0, 0)
		num += 8
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
	sql := `update matchs set score_a=$1,score_b=$2,is_resister=$3,pk_a=$4,pk_b=$5 where match_id=$6`
	sql1 := `update team_rank set point=point+$1,match_num=match_num+1,
	win_num=win_num+$2,draw_num=draw_num+$3,lose_num=lose_num+$4,goal_num=goal_num+$5 
	where team_id=$6 and club_match_id=$7`
	sql3 := `update team_rank set point=point-$1,match_num=match_num-1,
	win_num=win_num-$2,draw_num=draw_num-$3,lose_num=lose_num-$4,goal_num=goal_num-$5
	where team_id=$6 and club_match_id=$7`
	sql4 := `select tour_id from tournament where match_id=$1`
	sql5 := `select pearent_tour_id,pearent_team_place from tournament where tour_id=$1`
	sql6a := `select team_id_a from matchs where match_id=$1`
	sql6b := `select team_id_b from matchs where match_id=$1`
	sql7a := `update tournament set team_id_a=$1 where tour_id=$2`
	sql7b := `update tournament set team_id_b=$1 where tour_id=$2`
	sql8 := `select * from tournament where tour_id=$1`
	sql9 := `update tournament set match_id=$1 where tour_id=$2`

	prematch := entity.Matchs{}

	if err := mr.DBQry.SelectContext(ctx, &prematch, sql2, m.MatchID); err != nil {
		return err
	}

	_, err := mr.DBExc.ExecContext(ctx, sql, m.ScoreA, m.ScoreB, true, m.PkA, m.PkB, m.MatchID)

	if err != nil {
		return err
	}

	if prematch[0].MatchType == 1 {
		tourID := []int{}

		if err := mr.DBQry.SelectContext(ctx, &tourID, sql4, m.MatchID); err != nil {
			return err
		}

		ntms := entity.NewTournamentMatchs{}

		if err := mr.DBQry.SelectContext(ctx, &ntms, sql5, tourID[0]); err != nil {
			return err
		}

		wintid := entity.TeamIDs{}

		if m.ScoreA > m.ScoreB || m.PkA > m.PkB {
			if err := mr.DBQry.SelectContext(ctx, &wintid, sql6a, m.MatchID); err != nil {
				return err
			}
		} else if m.ScoreA < m.ScoreB || m.PkA < m.PkB {
			if err := mr.DBQry.SelectContext(ctx, &wintid, sql6b, m.MatchID); err != nil {
				return err
			}
		}

		if ntms[0].PearentTeamPlace == 1 {
			_, err := mr.DBExc.ExecContext(ctx, sql7a, wintid[0], ntms[0].PearentTourID)

			if err != nil {
				return err
			}
		} else if ntms[0].PearentTeamPlace == 2 {
			_, err := mr.DBExc.ExecContext(ctx, sql7b, wintid[0], ntms[0].PearentTourID)

			if err != nil {
				return err
			}
		} else if ntms[0].PearentTeamPlace == 0 {
			return nil
		}

		pretournament := entity.TournamentDBLists{}

		if err := mr.DBQry.SelectContext(ctx, &pretournament, sql8, ntms[0].PearentTourID); err != nil {
			return err
		}
		if pretournament[0].TeamIDA.Valid && pretournament[0].TeamIDB.Valid {

			m := entity.Match{
				ClubMatchID: pretournament[0].ClubMatchID,
				TeamIDA:     entity.TeamID(pretournament[0].TeamIDA.Int64),
				TeamIDB:     entity.TeamID(pretournament[0].TeamIDB.Int64),
			}

			new_mid, err := mr.AddMatchSingle(ctx, m, pretournament[0].MatchID)

			if err != nil {
				return err
			}

			_, err = mr.DBExc.ExecContext(ctx, sql9, new_mid, ntms[0].PearentTourID)

			if err != nil {
				return err
			}
		}

	}

	if prematch[0].MatchType == 0 {
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
	}

	return nil
}

func (mr *MatchRepository) AddMatchSingle(ctx context.Context, m entity.Match, del_mid sql.NullInt64) (entity.MatchID, error) {

	sql := `insert into matchs (team_id_a,team_id_b,score_a,score_b,club_match_id,pk_a,pk_b,match_type) values ($1, $2, $3,$4,$5, $6, $7,$8)`
	sql9 := `select m.match_id,m.club_match_id,tm.user_id from team_member tm left join matchs m on tm.club_match_id=m.club_match_id where m.match_id=$1`
	sql10 := `insert into match_vote (club_match_id,match_id,user_id) values `
	sql2 := `update tournament set match_id=Null where match_id=$1`
	sql4 := `delete from match_mom where match_id=$1`
	sql5 := `delete from my_team_mom where match_id=$1`
	sql6 := `delete from point_getter where match_id=$1`
	sql7 := `delete from match_vote where match_id=$1`
	sql8 := `delete from matchs where match_id=$1`

	if del_mid.Valid {
		l := entity.MatchID(del_mid.Int64)
		_, err := mr.DBExc.ExecContext(ctx, sql2, l)
		if err != nil {
			return -1, err
		}
		_, err = mr.DBExc.ExecContext(ctx, sql4, l)
		if err != nil {
			return -1, err
		}
		_, err = mr.DBExc.ExecContext(ctx, sql5, l)
		if err != nil {
			return -1, err
		}
		_, err = mr.DBExc.ExecContext(ctx, sql6, l)
		if err != nil {
			return -1, err
		}
		_, err = mr.DBExc.ExecContext(ctx, sql7, l)
		if err != nil {
			return -1, err
		}
		_, err = mr.DBExc.ExecContext(ctx, sql8, l)
		if err != nil {
			return -1, err
		}

	}

	_, err := mr.DBExc.ExecContext(ctx, sql, m.TeamIDA, m.TeamIDB, -1, -1, m.ClubMatchID, 0, 0, 1)
	fmt.Printf("b")
	if err != nil {
		return -1, err
	}
	fmt.Printf("c")
	sql14 := `select match_id from matchs ORDER BY match_id DESC LIMIT 1`
	var lastId int64
	if err := mr.DBQry.GetContext(ctx, &lastId, sql14); err != nil {
		return -1, err
	}

	lists := entity.MatchVotes{}
	if err := mr.DBQry.SelectContext(ctx, &lists, sql9, lastId); err != nil {
		return -1, err
	}
	fmt.Printf("d")
	var values2 []interface{}
	num := 1
	for _, l := range lists {
		sql10 += fmt.Sprintf("($%d, $%d, $%d), ", num, num+1, num+2)
		values2 = append(values2, l.ClubMatchID, l.MatchID, l.UserID)
		num += 3
	}
	fmt.Printf("e")

	sql10 = sql10[:len(sql10)-2]
	_, err = mr.DBExc.ExecContext(ctx, sql10, values2...)
	if err != nil {
		return -1, err
	}
	fmt.Printf("f")

	return entity.MatchID(lastId), nil
}
