package entity

type TopScorer struct {
	Name     string `json:"name" db:"name"`
	Furigana string `json:"furigana" db:"furigana"`
	GoalNum  int    `json:"goal_num" db:"goal_num"`
}

type TopScorers []*TopScorer
