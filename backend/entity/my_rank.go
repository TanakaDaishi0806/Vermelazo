package entity

type MyRank struct {
	RankAll         int  `json:"rank_all" db:"rank_all"`
	TotalAll        int  `json:"total_all" db:"total_all"`
	RankPosition    int  `json:"rank_position" db:"rank_position"`
	TotalPosition   int  `json:"total_position" db:"toral_position"`
	RankExperience  int  `json:"rank_experience" db:"rank_experience"`
	TotalExperience int  `json:"total_expeience" db:"total_experience"`
	GoalNum         int  `json:"goal_num" db:"goal_num"`
	RankGoal        int  `json:"rank_goal" db:"rank_goal"`
	TotalGoal       int  `json:"total_goal" db:"total_goal"`
	IsReleased      bool `json:"is_released" db:"is_released"`
}
