package store

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type VoteRepository struct {
	DBExc Execer
	DBQry Queryer
}

type ListPositionMom struct {
	DB Queryer
}

func (vr *VoteRepository) AddPositionMom(ctx context.Context, pm entity.PositionMom) error {
	sql1 := `delete from position_mom where club_match_id=? and position=?`
	sql := `insert into position_mom (club_match_id,position,user_id) values (?,?,?)`

	_, err := vr.DBExc.ExecContext(ctx, sql1, pm.ClubMatchID, pm.Position)
	if err != nil {
		return err
	}

	_, err = vr.DBExc.ExecContext(ctx, sql, pm.ClubMatchID, pm.Position, pm.UserID)
	if err != nil {
		return err
	}

	return nil
}

func (lpm *ListPositionMom) ListPositionMom(ctx context.Context, cmid entity.ClubMatchID) (entity.PositionMoms, error) {
	sql := `select pm.club_match_id,pm.position,pm.user_id,u.name,u.furigana from position_mom pm left join users u on pm.user_id=u.user_id where pm.club_match_id=? order by pm.position`

	pml := entity.PositionMoms{}

	if err := lpm.DB.SelectContext(ctx, &pml, sql, cmid); err != nil {
		return nil, err
	}

	return pml, nil
}

func (vr *VoteRepository) ChangePositionMom(ctx context.Context, pm entity.PositionMom) error {
	sql := `update position_mom set user_id=? where club_match_id=? and position=?`

	_, err := vr.DBExc.ExecContext(ctx, sql, pm.UserID, pm.ClubMatchID, pm.Position)
	if err != nil {
		return err
	}

	return nil
}

func (vr *VoteRepository) VoteKind(ctx context.Context, cmid entity.ClubMatchID, uid entity.UserId) (entity.VoteKindNums, error) {
	sql1 := `select team_id from team_member where club_match_id=? and user_id=?`
	sql2 := `select case when m.team_id_a=? or m.team_id_b=? then false else true end as vote_kind_num from matchs m where club_match_id=?`

	tid := []int{}
	if err := vr.DBQry.SelectContext(ctx, &tid, sql1, cmid, uid); err != nil {
		return nil, err
	}

	lists := entity.VoteKindNums{}

	if err := vr.DBQry.SelectContext(ctx, &lists, sql2, tid[0], tid[0], cmid); err != nil {
		return nil, err
	}
	return lists, nil

}

func (vr *VoteRepository) AddMyteamMom(ctx context.Context, mm entity.MyTeamMom, uid entity.UserId) error {
	sql := `insert into my_team_mom (club_match_id,match_id,user_id) values (?,?,?)`
	sql1 := `update match_vote set is_vote=true where match_id=? and user_id=?`

	_, err := vr.DBExc.ExecContext(ctx, sql, mm.ClubMatchID, mm.MatchID, mm.UserID)
	if err != nil {
		return err
	}

	_, err = vr.DBExc.ExecContext(ctx, sql1, mm.MatchID, uid)
	if err != nil {
		return err
	}

	return nil
}

func (vr *VoteRepository) ListMyIsVote(ctx context.Context, uid entity.UserId, cmid entity.ClubMatchID) (entity.MatchVotes, error) {
	sql := `select mv.match_id,mv.club_match_id,mv.user_id,tm.team_id,mv.is_vote 
			from match_vote mv 
			left join (select * 
						from team_member 
						where club_match_id=?) tm 
			on mv.user_id =tm.user_id 
			where tm.user_id=? and mv.club_match_id=?`

	lists := entity.MatchVotes{}

	if err := vr.DBQry.SelectContext(ctx, &lists, sql, cmid, uid, cmid); err != nil {
		return nil, err
	}
	return lists, nil

}

func (vr *VoteRepository) AddMatchMom(ctx context.Context, mm entity.MatchMom, uid entity.UserId) error {
	sql := `insert into match_mom (club_match_id,match_id,user_id) values (?,?,?)`
	sql1 := `update match_vote set is_vote=true where match_id=? and user_id=?`

	_, err := vr.DBExc.ExecContext(ctx, sql, mm.ClubMatchID, mm.MatchID, mm.UserID)
	if err != nil {
		return err
	}

	_, err = vr.DBExc.ExecContext(ctx, sql1, mm.MatchID, uid)
	if err != nil {
		return err
	}

	return nil
}

func (vr *VoteRepository) EachMatchMom(ctx context.Context, mid entity.MatchID) (entity.EachMatchMoms, error) {
	sql :=
		`select sub3.user_id,sub3.name,sub3.furigana  
	from (select sub2.user_id,sub2.name,sub2.furigana,count(*) as count 
			from (select u.user_id,u.name,u.furigana 
				from (select user_id 
					from my_team_mom 
					where match_id=? 
					union all 
					select user_id 
					from match_mom 
					where match_id=?) sub1 
			left join users u on sub1.user_id=u.user_id) sub2 
	group by user_id)sub3 
	where count=(select Max(sub3.count) 
				from (select count(*) as count 
					from (select u.user_id,u.name,u.furigana 
						from (select user_id 
							from my_team_mom 
							where match_id=? 
							union all 
							select user_id 
							from match_mom 
							where match_id=?) sub4 
					left join users u on sub4.user_id=u.user_id) sub5 
				group by user_id) sub3)`

	l := entity.EachMatchMoms{}
	if err := vr.DBQry.SelectContext(ctx, &l, sql, mid, mid, mid, mid); err != nil {
		return nil, err
	}

	return l, nil
}
