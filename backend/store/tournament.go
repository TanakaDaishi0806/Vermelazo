package store

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type TournamentRepository struct {
	DBExc Execer
	DBQry Queryer
}

var null sql.NullInt64

func (tr *TournamentRepository) GetTeamNum(ctx context.Context, cmid entity.ClubMatchID) (int, error) {
	sql := `select count(*) from team where club_match_id=$1`

	var tnum []int

	if err := tr.DBQry.SelectContext(ctx, &tnum, sql, cmid); err != nil {
		log.Printf("getTeamnumerr")
		return 0, err
	}

	return tnum[0], nil
}

func (tr *TournamentRepository) AddMatch(ctx context.Context, m entity.Match) (entity.MatchID, error) {

	sql := `insert into matchs (team_id_a,team_id_b,score_a,score_b,club_match_id,pk_a,pk_b,match_type) values ($1, $2, $3,$4,$5, $6, $7,$8)`
	sql9 := `select m.match_id,m.club_match_id,tm.user_id from team_member tm left join matchs m on tm.club_match_id=m.club_match_id where m.match_id=$1`
	sql10 := `insert into match_vote (club_match_id,match_id,user_id) values `
	sql2 := `delete from tournament where match_id=$1`
	sql3 := `select match_id from tournament where club_match_id=$1 AND match_id IS NOT NULL`
	sql4 := `delete from match_mom where match_id=$1`
	sql5 := `delete from my_team_mom where match_id=$1`
	sql6 := `delete from point_getter where match_id=$1`
	sql7 := `delete from match_vote where match_id=$1`
	sql8 := `delete from matchs where match_id=$1`

	var del_mids []int64 // 修正: []int -> []int64

	if err := tr.DBQry.SelectContext(ctx, &del_mids, sql3, m.ClubMatchID); err != nil {
		return -1, err
	}

	for _, l := range del_mids {
		_, err := tr.DBExc.ExecContext(ctx, sql2, l)
		if err != nil {
			return -1, err
		}
		_, err = tr.DBExc.ExecContext(ctx, sql4, l)
		if err != nil {
			return -1, err
		}
		_, err = tr.DBExc.ExecContext(ctx, sql5, l)
		if err != nil {
			return -1, err
		}
		_, err = tr.DBExc.ExecContext(ctx, sql6, l)
		if err != nil {
			return -1, err
		}
		_, err = tr.DBExc.ExecContext(ctx, sql7, l)
		if err != nil {
			return -1, err
		}
		_, err = tr.DBExc.ExecContext(ctx, sql8, l)
		if err != nil {
			return -1, err
		}

	}

	_, err := tr.DBExc.ExecContext(ctx, sql, m.TeamIDA, m.TeamIDB, -1, -1, m.ClubMatchID, 0, 0, 1)
	fmt.Printf("b")
	if err != nil {
		return -1, err
	}
	fmt.Printf("c")
	sql14 := `select match_id from matchs ORDER BY match_id DESC LIMIT 1`
	var lastId int64
	if err := tr.DBQry.GetContext(ctx, &lastId, sql14); err != nil {
		return -1, err
	}

	lists := entity.MatchVotes{}
	if err := tr.DBQry.SelectContext(ctx, &lists, sql9, lastId); err != nil {
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
	_, err = tr.DBExc.ExecContext(ctx, sql10, values2...)
	if err != nil {
		return -1, err
	}
	fmt.Printf("f")

	return entity.MatchID(lastId), nil
}

func (tr *TournamentRepository) ListTeamRank(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamRanks, error) {
	sql := `select * from team_rank where club_match_id=$1 order by point desc,win_num desc,goal_num desc`

	l := entity.TeamRanks{}
	if err := tr.DBQry.SelectContext(ctx, &l, sql, cmid); err != nil {
		return nil, err
	}

	return l, nil
}

func (tr *TournamentRepository) CreateTournament(ctx context.Context, tl entity.TournamentDBs) error {
	sql := `insert into tournament (tour_id,club_match_id,match_id,team_id_a,team_id_b,match_level,pearent_tour_id,pearent_team_place) values `
	sql2 := `delete from tournament where club_match_id=$1`

	_, err := tr.DBExc.ExecContext(ctx, sql2, tl[0].ClubMatchID)
	if err != nil {
		return err
	}

	var values []interface{}
	var num int = 1

	for _, l := range tl {
		fmt.Printf("tourID;%d", l.ID)
		sql += fmt.Sprintf("($%d, $%d, $%d, $%d, $%d,$%d,$%d,$%d), ", num, num+1, num+2, num+3, num+4, num+5, num+6, num+7)
		if l.MatchID == 0 {
			if l.TeamIDA == 0 && l.TeamIDB != 0 {
				values = append(values, l.ID, l.ClubMatchID, null, null, l.TeamIDB, l.MatchLevel, l.PearentTourID, l.PearentTeamPlace)

			} else if l.TeamIDA != 0 && l.TeamIDB == 0 {
				values = append(values, l.ID, l.ClubMatchID, null, l.TeamIDA, null, l.MatchLevel, l.PearentTourID, l.PearentTeamPlace)

			} else if l.TeamIDA == 0 && l.TeamIDB == 0 {
				values = append(values, l.ID, l.ClubMatchID, null, null, null, l.MatchLevel, l.PearentTourID, l.PearentTeamPlace)
			}

		} else {
			values = append(values, l.ID, l.ClubMatchID, l.MatchID, l.TeamIDA, l.TeamIDB, l.MatchLevel, l.PearentTourID, l.PearentTeamPlace)

		}

		num += 8
	}
	sql = sql[:len(sql)-2]
	_, err = tr.DBExc.ExecContext(ctx, sql, values...)
	if err != nil {
		return err
	}

	return nil
}

func (tr *TournamentRepository) ListTournament(ctx context.Context, cmid entity.ClubMatchID) (entity.Tournaments, error) {
	sql := `select tm.tour_id,tm.club_match_id,tm.match_id,tm.team_id_a,tm.team_id_b,tm.match_level from tournament tm where club_match_id=$1 order by match_level desc`

	lists := entity.TournamentLists{}

	if err := tr.DBQry.SelectContext(ctx, &lists, sql, cmid); err != nil {
		return nil, err
	}

	rsq := entity.Tournaments{}

	for _, l := range lists {
		var matchID entity.MatchID
		if l.TeamIDB.Valid {
			matchID = entity.MatchID(l.MatchID.Int64)
		} else {
			// teamIDBがnullの場合の処理
			matchID = entity.MatchID(0) // 例えば、0を代入
		}
		var teamIDA entity.TeamID
		if l.TeamIDA.Valid {
			teamIDA = entity.TeamID(l.TeamIDA.Int64)
		} else {
			// teamIDBがnullの場合の処理
			teamIDA = entity.TeamID(0) // 例えば、0を代入
		}
		var teamIDB entity.TeamID
		if l.TeamIDB.Valid {
			teamIDB = entity.TeamID(l.TeamIDB.Int64)
		} else {
			// teamIDBがnullの場合の処理
			teamIDB = entity.TeamID(0) // 例えば、0を代入
		}
		rsq = append(rsq, &entity.Tournament{
			ID:          l.ID,
			ClubMatchID: l.ClubMatchID,
			MatchID:     matchID,
			TeamIDA:     teamIDA,
			TeamIDB:     teamIDB,
			MatchLevel:  l.MatchLevel,
		})

	}

	return rsq, nil
}

func (tr *TournamentRepository) ListTournamentResult(ctx context.Context, cmid entity.ClubMatchID) (entity.TournamentResults, error) {
	sql := `select tm.tour_id,tm.club_match_id,tm.match_id,tm.team_id_a,tm.team_id_b,tm.match_level,m.score_a,m.score_b,m.pk_a,m.pk_b from tournament tm 
	left join matchs m on tm.match_id=m.match_id where tm.club_match_id=$1 order by match_level,match_id`

	lists := entity.TournamentResultLists{}

	if err := tr.DBQry.SelectContext(ctx, &lists, sql, cmid); err != nil {
		return nil, err
	}

	rsq := entity.TournamentResults{}

	for _, l := range lists {
		var matchID entity.MatchID
		if l.TeamIDB.Valid {
			matchID = entity.MatchID(l.MatchID.Int64)
		} else {
			// teamIDBがnullの場合の処理
			matchID = entity.MatchID(0) // 例えば、0を代入
		}
		var teamIDA entity.TeamID
		if l.TeamIDA.Valid {
			teamIDA = entity.TeamID(l.TeamIDA.Int64)
		} else {
			// teamIDBがnullの場合の処理
			teamIDA = entity.TeamID(0) // 例えば、0を代入
		}
		var teamIDB entity.TeamID
		if l.TeamIDB.Valid {
			teamIDB = entity.TeamID(l.TeamIDB.Int64)
		} else {
			// teamIDBがnullの場合の処理
			teamIDB = entity.TeamID(0) // 例えば、0を代入
		}
		var scoreA int
		if l.ScoreA.Valid {
			scoreA = int(l.ScoreA.Int64)
		} else {
			// teamIDBがnullの場合の処理
			scoreA = -1 // 例えば、0を代入
		}
		var scoreB int
		if l.ScoreB.Valid {
			scoreB = int(l.ScoreB.Int64)
		} else {
			// teamIDBがnullの場合の処理
			scoreB = -1 // 例えば、0を代入
		}
		var pkA int
		if l.PkA.Valid {
			pkA = int(l.PkA.Int64)
		} else {
			// teamIDBがnullの場合の処理
			pkA = 0 // 例えば、0を代入
		}
		var pkB int
		if l.PkB.Valid {
			pkB = int(l.PkB.Int64)
		} else {
			// teamIDBがnullの場合の処理
			pkB = 0 // 例えば、0を代入
		}
		rsq = append(rsq, &entity.TournamentResult{
			ID:          l.ID,
			ClubMatchID: l.ClubMatchID,
			MatchID:     matchID,
			TeamIDA:     teamIDA,
			TeamIDB:     teamIDB,
			MatchLevel:  l.MatchLevel,
			ScoreA:      scoreA,
			ScoreB:      scoreB,
			PkA:         pkA,
			PkB:         pkB,
		})

	}

	return rsq, nil
}

func (tr *TournamentRepository) GetTournamenID(ctx context.Context) (entity.TournID, error) {
	sql := `select tour_id from tournament order by tour_id desc limit 1`

	l := []entity.TournID{}
	if err := tr.DBQry.SelectContext(ctx, &l, sql); err != nil {
		return -1, err
	}

	if len(l) == 0 {
		return 0, nil
	} else {

		return l[0], nil

	}

}
