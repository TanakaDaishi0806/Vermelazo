package entity

type TeamID int64

type TeamIDs []TeamID

type CreateTeamInfo struct {
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	TeamNum     int         `json:"team_num" db:"team_num"`
}

type Team struct {
	ID          TeamID        `json:"team_id" db:"team_id"`
	ClubMatchID ClubMatchID   `json:"club_match_id" db:"club_match_id"`
	UserID      UserId        `json:"user_id" db:"user_id"`
	Position    PositionNum   `json:"position" db:"position"`
	Experience  ExperienceNum `json:"experience" db:"experience"`
}

type ChangeTeamMember struct {
	LeftTeamID  TeamID      `json:"left_team_id"`
	RightTeamID TeamID      `json:"right_team_id"`
	LeftUserID  UserId      `json:"left_user_id"`
	RightUserID UserId      `json:"right_user_id"`
	ClubMatchID ClubMatchID `json:"club_match_id"`
}

type Teams []*Team

type EachTeams [][]*Team
