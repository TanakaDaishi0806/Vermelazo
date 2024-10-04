package service

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type UserRegister interface {
	RegisterUser(ctx context.Context, requ *entity.User) error
}

type UserGetter interface {
	GetUser(ctx context.Context, stuendtID string) (*entity.User, error)
}

type ClubMatchAdd interface {
	AddClubMatch(ctx context.Context, reqcm *entity.ClubMatch) error
}

type ClubMatchReleasedSwitch interface {
	SwitchClubMatchReleased(ctx context.Context, id entity.ClubMatchID, b bool) (entity.ClubMatchs, error)
}
type ParticipantAdd interface {
	AddParticipant(ctx context.Context, p *entity.Paticipant) (entity.ClubMatchs, error)
}

type ParticipantDelete interface {
	DeleteParticipant(ctx context.Context, p *entity.Paticipant) (entity.ClubMatchs, error)
}

type ListParticipant interface {
	ListParticipant(ctx context.Context, uid entity.UserId) (entity.ClubMatchs, error)
}

type TeamCreate interface {
	ResisterTeamName(ctx context.Context, cti *entity.CreateTeamInfo) (entity.TeamIDs, error)
	OrderParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.Teams, error)
	ResisterTeamMember(ctx context.Context, lists entity.Teams) error
}

type TeamChange interface {
	ChangeTeamMember(ctx context.Context, ctm *entity.ChangeTeamMember) error
	OrderTeams(ctx context.Context, cmid entity.ClubMatchID) (entity.Teams, error)
	GetTeamNum(ctx context.Context, cmid entity.ClubMatchID) (int, error)
}

type TeamMemberDelete interface {
	DeleteTeamMember(ctx context.Context, cmid entity.ClubMatchID, uid entity.UserId) (entity.ClubMatchs, error)
}

type TeamList interface {
	OrderTeamsWithAward(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamsWithAward, error)
	GetTeamNum(ctx context.Context, cmid entity.ClubMatchID) (int, error)
}

type TeamMemberAdd interface {
	AddTeamMember(ctx context.Context, p *entity.Paticipant) (entity.ClubMatchs, error)
}

type MatchAdd interface {
	GetTeamList(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamIDs, error)
	AddMatch(ctx context.Context, mlist entity.Matchs) error
}

type KindVote interface {
	VoteKind(ctx context.Context, cmid entity.ClubMatchID, uid entity.UserId) (entity.VoteKindNums, error)
}

type ListMyRank interface {
	ListMyRank(ctx context.Context, uid entity.UserId) (*entity.MyRank, error)
}

type UserInfoChange interface {
	ChangeUserInfo(ctx context.Context, ui *entity.User) error
}

type UserInfoList interface {
	ListUserInfo(ctx context.Context, uid entity.UserId) (*entity.User, error)
}

type UserPasswordChange interface {
	ChangeUserPassword(ctx context.Context, uid entity.UserId, p string) error
}

type PasswordResetSendMail interface {
	GetMailAddress(ctx context.Context, sid string) (string, error)
	AddPasswordResetData(ctx context.Context, pr *entity.PasswordReset) error
	ExistToken(ctx context.Context, token string) (bool, error)
}

type PasswordReset interface {
	GetTokenData(ctx context.Context, token string) (*entity.PasswordReset, error)
	ResetPassword(ctx context.Context, sid string, p string) error
}

type TournamentRepository interface {
	GetTeamNum(ctx context.Context, cmid entity.ClubMatchID) (int, error)
	AddMatch(ctx context.Context, m entity.Match) (entity.MatchID, error)
	ListTeamRank(ctx context.Context, cmid entity.ClubMatchID) (entity.TeamRanks, error)
	CreateTournament(ctx context.Context, tl entity.TournamentDBs) error
	GetTournamenID(ctx context.Context) (entity.TournID, error)
}
