package handler

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type RegisterUserService interface {
	RegisterUser(ctx context.Context, requ *entity.User) (*entity.User, error)
}

type LoginService interface {
	Login(ctx context.Context, studentID string, pw string) (string, error)
}

type SwitchClubMatchReleasedService interface {
	SwitchClubMatchReleased(ctx context.Context, id entity.ClubMatchID, rbool bool) (entity.ClubMatchs, error)
}

type AddParticipantService interface {
	AddParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error)
}

type ListClubMatchUsersService interface {
	ListClubMatchUsers(ctx context.Context) (entity.ClubMatchs, error)
}

type DeleteParticipantService interface {
	DeleteParticipant(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error)
}

type CreateTeamService interface {
	CreateTeam(ctx context.Context, cti *entity.CreateTeamInfo) (entity.EachTeams, error)
}

type ChangeTeamService interface {
	ChangeTeam(ctx context.Context, ctm *entity.ChangeTeamMember) (entity.EachTeams, error)
}

type DeleteTeamMemberService interface {
	DeleteTeamMember(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error)
}

type ListTeamService interface {
	ListTeam(ctx context.Context, cmid entity.ClubMatchID) (entity.EachTeams, error)
}

type AddTeamMemberService interface {
	AddTeamMember(ctx context.Context, cmid entity.ClubMatchID) (entity.ClubMatchs, error)
}

type AddMatchService interface {
	AddMatch(ctx context.Context, cmid entity.ClubMatchID, matchNum int) (entity.Matchs, error)
}

type VoteKindService interface {
	VoteKind(ctx context.Context, cmid entity.ClubMatchID) (entity.VoteKindNums, error)
}

type MyRankService interface {
	MyRank(ctx context.Context) (*entity.MyRank, error)
}

type ChangeUserInfoService interface {
	ChangeUserInfo(ctx context.Context, ui *entity.User) error
}

type ListUserInfoService interface {
	ListUserInfo(ctx context.Context) (*entity.User, error)
}

type ChangeUserPasswordService interface {
	ChangeUserPassword(ctx context.Context, p string) error
}

type SendMailPasswordResetService interface {
	SendMailPasswordReset(ctx context.Context, sid string, ma string) error
}

type ResetPasswordService interface {
	ResetPassword(ctx context.Context, token string, password string) error
}
