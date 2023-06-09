package store

import (
	"context"
	"log"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type TeamRepository struct {
	DBExc Execer
	DBQry Queryer
}

func (tr *TeamRepository) ResisterTeamName(ctx context.Context, cti *entity.CreateTeamInfo) (entity.TeamIDs, error) {
	sql1 := `delete from team_member where club_match_id=?`
	sql2 := `delete from team where club_match_id=?`
	sql := `INSERT INTO team (club_match_id) VALUES (?)`
	_, err := tr.DBExc.ExecContext(ctx, sql1, cti.ClubMatchID)
	if err != nil {
		return nil, err
	}
	_, err = tr.DBExc.ExecContext(ctx, sql2, cti.ClubMatchID)
	if err != nil {
		return nil, err
	}
	lists := entity.TeamIDs{}
	for i := 0; i < cti.TeamNum; i++ {
		result, err := tr.DBExc.ExecContext(ctx, sql, cti.ClubMatchID)
		if err != nil {
			return nil, err
		}
		id, err := result.LastInsertId()
		if err != nil {
			return nil, err
		}
		lists = append(lists, entity.TeamID(id))
	}

	return lists, nil
}

func (tr *TeamRepository) OrderParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.Teams, error) {
	sql := `select p.club_match_id, u.user_id, u.name ,u.furigana,u.position, u.experience from users u, participant p where p.club_match_id=? AND u.user_id=p.user_id order by u.position asc, (u.point+u.experience*10) desc`

	lists := entity.Teams{}
	if err := tr.DBQry.SelectContext(ctx, &lists, sql, cmid); err != nil {
		return nil, err
	}

	return lists, nil

}

func (tr *TeamRepository) ResisterTeamMember(ctx context.Context, lists entity.Teams) error {

	sql := `insert into team_member (team_id,user_id,club_match_id) values(?,?,?)`
	sql1 := `update club_match set is_create_team=? where club_match_id=?`

	for i := 0; i < len(lists); i++ {
		_, err := tr.DBExc.ExecContext(ctx, sql, lists[i].ID, lists[i].UserID, lists[i].ClubMatchID)
		if err != nil {
			return err
		}

	}

	_, err := tr.DBExc.ExecContext(ctx, sql1, true, lists[0].ClubMatchID)
	if err != nil {
		return err
	}

	return nil

}

func (tr *TeamRepository) ChangeTeamMember(ctx context.Context, ctm *entity.ChangeTeamMember) error {
	sql := `update team_member set team_id=? where user_id=? AND club_match_id=?`

	_, err := tr.DBExc.ExecContext(ctx, sql, ctm.ChangeTeamID, ctm.UserID, ctm.ClubMatchID)
	if err != nil {
		return err
	}

	return err

}

func (tr *TeamRepository) OrderTeams(ctx context.Context, cmid entity.ClubMatchID) (entity.Teams, error) {
	sql := `select t.team_id,t.club_match_id, u.user_id, u.name,u.furigana,u.position, u.experience from users u, team_member t where t.club_match_id=? AND u.user_id=t.user_id AND t.is_exist=true order by t.team_id`

	lists := entity.Teams{}
	if err := tr.DBQry.SelectContext(ctx, &lists, sql, cmid); err != nil {
		return nil, err
	}

	return lists, nil

}

func (tr *TeamRepository) GetTeamNum(ctx context.Context, cmid entity.ClubMatchID) (int, error) {
	sql := `select count(*) from team where club_match_id=?`

	var tnum []int

	if err := tr.DBQry.SelectContext(ctx, &tnum, sql, cmid); err != nil {
		log.Printf("getTeamnumerr")
		return 0, err
	}

	return tnum[0], nil
}

func (tr *TeamRepository) DeleteTeamMember(ctx context.Context, cmid entity.ClubMatchID, uid entity.UserId) (entity.ClubMatchs, error) {
	sql1 := `delete from participant where user_id=? AND club_match_id=?`
	sql2 := `UPDATE club_match SET participant_num = participant_num - 1 WHERE club_match_id = ?`
	sql := `update team_member set is_exist=false where user_id=? AND club_match_id=?`

	_, err := tr.DBExc.ExecContext(ctx, sql1, uid, cmid)
	if err != nil {
		return nil, err
	}

	_, err = tr.DBExc.ExecContext(ctx, sql2, cmid)
	if err != nil {
		return nil, err
	}

	_, err = tr.DBExc.ExecContext(ctx, sql, uid, cmid)
	if err != nil {
		return nil, err
	}

	lp := &ListParticipant{DB: tr.DBQry}

	l, err := lp.ListParticipant(ctx, uid)
	if err != nil {
		return nil, err
	}

	return l, nil

}

func (tr *TeamRepository) AddTeamMember(ctx context.Context, p *entity.Paticipant) (entity.ClubMatchs, error) {
	ap := &AddParticipant{DBExc: tr.DBExc, DBQry: tr.DBQry}

	l, err := ap.AddParticipant(ctx, p)
	if err != nil {
		return nil, err
	}

	sql1 := `select count(*) from team_member where user_id=? and club_match_id=?`
	sql2 := `update team_member set is_exist=true where user_id=? and club_match_id=?`
	sql3 := `select team_id 
	from team_member 
	where club_match_id=? and is_exist=true 
	group by team_id 
	having count(*)=(
		select min(team_count) 
		from (
			select count(*) as team_count 
			from team_member 
			where club_match_id=? and is_exist=true 
			group by team_id
		) as counts
	) 
	order by team_id 
	limit 1`
	sql4 := `insert into team_member (team_id,user_id,club_match_id) values(?,?,?)`

	var existNum []int

	if err := tr.DBQry.SelectContext(ctx, &existNum, sql1, p.UserID, p.ClubMatchID); err != nil {
		return nil, err
	}

	if existNum[0] == 1 {
		_, err = tr.DBExc.ExecContext(ctx, sql2, p.UserID, p.ClubMatchID)
		if err != nil {
			return nil, err
		}
	}

	if existNum[0] == 0 {
		var tid []int
		if err := tr.DBQry.SelectContext(ctx, &tid, sql3, p.ClubMatchID, p.ClubMatchID); err != nil {
			return nil, err
		}
		_, err := tr.DBExc.ExecContext(ctx, sql4, tid[0], p.UserID, p.ClubMatchID)
		if err != nil {
			return nil, err
		}
	}

	return l, nil
}
