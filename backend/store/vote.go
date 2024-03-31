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
	sql1 := `delete from position_mom where club_match_id=$1 and position=$2`
	sql := `insert into position_mom (club_match_id,position,user_id) values ($1,$2,$3)`

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
	sql := `select pm.club_match_id,pm.position,pm.user_id,u.name,u.furigana from position_mom pm left join users u on pm.user_id=u.user_id where pm.club_match_id=$1 order by pm.position`

	pml := entity.PositionMoms{}

	if err := lpm.DB.SelectContext(ctx, &pml, sql, cmid); err != nil {
		return nil, err
	}

	return pml, nil
}

func (vr *VoteRepository) ChangePositionMom(ctx context.Context, pm entity.PositionMom) error {
	sql := `update position_mom set user_id=$1 where club_match_id=$2 and position=$3`

	_, err := vr.DBExc.ExecContext(ctx, sql, pm.UserID, pm.ClubMatchID, pm.Position)
	if err != nil {
		return err
	}

	return nil
}

func (vr *VoteRepository) VoteKind(ctx context.Context, cmid entity.ClubMatchID, uid entity.UserId) (entity.VoteKindNums, error) {
	sql1 := `select team_id from team_member where club_match_id=$1 and user_id=$2`
	sql2 := `select case when m.team_id_a=$1 or m.team_id_b=$2 then false else true end as vote_kind_num from matchs m where club_match_id=$3`

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
	sql := `insert into my_team_mom (club_match_id,match_id,user_id) values ($1,$2,$3)`
	sql1 := `update match_vote set is_vote=true where match_id=$1 and user_id=$2`

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
						where club_match_id=$1) tm 
			on mv.user_id =tm.user_id 
			where tm.user_id=$2 and mv.club_match_id=$3 order by mv.match_id`

	lists := entity.MatchVotes{}

	if err := vr.DBQry.SelectContext(ctx, &lists, sql, cmid, uid, cmid); err != nil {
		return nil, err
	}
	return lists, nil

}

func (vr *VoteRepository) AddMatchMom(ctx context.Context, mm entity.MatchMom, uid entity.UserId) error {
	sql := `insert into match_mom (club_match_id,match_id,user_id) values ($1,$2,$3)`
	sql1 := `update match_vote set is_vote=true where match_id=$1 and user_id=$2`

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
		`SELECT sub3.user_id, sub3.name, sub3.furigana
		FROM (
			SELECT sub2.user_id, sub2.name, sub2.furigana, COUNT(*) AS count
			FROM (
				SELECT u.user_id, u.name, u.furigana
				FROM (
					SELECT user_id
					FROM my_team_mom
					WHERE match_id=$1
					UNION ALL
					SELECT user_id
					FROM match_mom
					WHERE match_id=$2
				) sub1
				LEFT JOIN users u ON sub1.user_id=u.user_id
			) sub2
			GROUP BY sub2.user_id, sub2.name, sub2.furigana
		) sub3
		WHERE sub3.count = (
			SELECT MAX(count) FROM (
				SELECT COUNT(*) AS count
				FROM (
					SELECT user_id
					FROM my_team_mom
					WHERE match_id=$3
					UNION ALL
					SELECT user_id
					FROM match_mom
					WHERE match_id=$4
				) sub4
				LEFT JOIN users u ON sub4.user_id=u.user_id
				GROUP BY u.user_id, u.name, u.furigana
			) AS sub5
		)`

	l := entity.EachMatchMoms{}
	if err := vr.DBQry.SelectContext(ctx, &l, sql, mid, mid, mid, mid); err != nil {
		return nil, err
	}

	return l, nil
}
