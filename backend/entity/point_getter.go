package entity

type PointID int64

type PointGetter struct {
	PointID     PointID     `json:"point_id" db:"point_id"`
	MatchID     MatchID     `json:"match_id" db:"match_id"`
	TeamID      TeamID      `json:"team_id" db:"team_id"`
	UserID      UserId      `json:"user_id" db:"user_id"`
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	Name        string      `json:"name" db:"name"`
	Furigana    string      `json:"furigana" db:"furigana"`
}

type PointGetters []*PointGetter
