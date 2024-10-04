package handler

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ClubMatchAdd interface {
	AddClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error
}

type ClubMatchList interface {
	ListClubMatch(ctx context.Context) (entity.ClubMatchs, error)
}

type ClubMatchChange interface {
	ChangeClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error
}
type ClubMatchDelete interface {
	DeleteClubMatch(ctx context.Context, id entity.ClubMatchID) (entity.ClubMatchs, error)
}

type MatchList interface {
	ListMatch(ctx context.Context, cmid entity.ClubMatchID) (entity.Matchs, error)
}

type ScoreAdd interface {
	AddScore(ctx context.Context, m *entity.Match) error
}

type PointGetterAdd interface {
	AddPointGetter(ctx context.Context, pg *entity.PointGetter) error
}

type PointGetterList interface {
	ListPointGetter(ctx context.Context, mid entity.MatchID, tid entity.TeamID) (entity.Teams, error)
}

type PointGetterDelete interface {
	DeletePointGetter(ctx context.Context, mid entity.MatchID) error
}

type ListSpecifyTeamService interface {
	ListSpecifyTeam(ctx context.Context, tid entity.TeamID) (entity.Teams, error)
}

type ClubMatchFinishSwitch interface {
	SwitchClubMatchFinish(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error)
}

type PositionMemberList interface {
	ListPositionMember(ctx context.Context, cmid entity.ClubMatchID, pt entity.PositionNum) (entity.Teams, error)
}

type PositionMomAdd interface {
	AddPositionMom(ctx context.Context, pm entity.PositionMom) error
}

type PositionMomList interface {
	ListPositionMom(ctx context.Context, cmid entity.ClubMatchID) (entity.PositionMoms, error)
}

type PositionMomChange interface {
	ChangePositionMom(ctx context.Context, pm entity.PositionMom) error
}

type MyteamMomAdd interface {
	AddMyteamMom(ctx context.Context, mm entity.MyTeamMom, uid entity.UserId) error
}

type MyIsVoteList interface {
	ListMyIsVote(ctx context.Context, uid entity.UserId, cmid entity.ClubMatchID) (entity.MatchVotes, error)
}

type MatchMomAdd interface {
	AddMatchMom(ctx context.Context, mm entity.MatchMom, uid entity.UserId) error
}

type MatchMomEach interface {
	EachMatchMom(ctx context.Context, mid entity.MatchID) (entity.EachMatchMoms, error)
}

type TeamRankList interface {
	ListTeamRank(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamRanks, error)
}

type TopScorerList interface {
	ListTopScorer(ctx context.Context, cmid entity.ClubMatchID) (entity.TopScorers, error)
}

type ParticipantNameList interface {
	ListParticipantName(ctx context.Context, cmid entity.ClubMatchID) (entity.ParticipantInfos, error)
}

type CategoryTopList interface {
	ListCategoryTop(ctx context.Context) (*entity.CategoryTop, error)
}

type AllUsersList interface {
	ListAllUsers(ctx context.Context) (entity.PositionUserNames, error)
}

type AwardAdd interface {
	AddAward(ctx context.Context, an string, uid entity.UserID) (entity.AwardID, error)
}

type AwardList interface {
	ListAward(ctx context.Context) (entity.Awards, error)
}

type AwardDelete interface {
	DeleteAward(ctx context.Context, aid entity.AwardID) (entity.Awards, error)
}

type GoalNumRankersList interface {
	ListGoalNumRankers(ctx context.Context) (entity.GoalNumRankers, error)
}

type TournamentList interface {
	ListTournament(ctx context.Context, cmid entity.ClubMatchID) (entity.Tournaments, error)
}

type TournamentResultList interface {
	ListTournamentResult(ctx context.Context, cmid entity.ClubMatchID) (entity.TournamentResults, error)
}

type TeamNumList interface {
	ListTeamNum(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamNums, error)
}
