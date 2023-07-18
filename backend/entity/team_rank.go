package entity

type TeamRank struct {
	TeamID      TeamID      `json:"team_id" db:"team_id"`
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	Point       int         `json:"point" db:"point"`
	MatchNum    int         `json:"match_num" db:"match_num"`
	WinNum      int         `json:"win_num" db:"win_num"`
	DrawNum     int         `json:"draw_num" db:"draw_num"`
	LoseNum     int         `json:"lose_num" db:"lose_num"`
	GoalNum     int         `json:"goal_num" db:"goal_num"`
	IsLastRank  int         `json:"is_last_rank" db:"is_last_rank"`
}

type TeamRanks []*TeamRank
