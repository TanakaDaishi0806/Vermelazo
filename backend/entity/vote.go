package entity

type ID int64

// myteamVote=false,matchVote=true
type VoteKind struct {
	VoteKindNum bool `json:"vote_kind_num" db:"vote_kind_num"`
}

type VoteKindNums []*VoteKind

type PositionMom struct {
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	Position    PositionNum `json:"position" db:"position"`
	UserID      UserId      `json:"user_id" db:"user_id"`
	Name        string      `json:"name" db:"name"`
	Furigana    string      `json:"furigana" db:"furigana"`
}

type PositionMoms []*PositionMom

type MyTeamMom struct {
	ID          ID          `json:"id" db:"id"`
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	MatchID     MatchID     `json:"match_id" db:"match_id"`
	UserID      UserId      `json:"user_id" db:"user_id"`
	Name        string      `json:"name" db:"name"`
	Furigana    string      `json:"furigana" db:"furigana"`
}

type MyTeamMoms []*MyTeamMom

type MatchMom struct {
	ID          ID          `json:"id" db:"id"`
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	MatchID     MatchID     `json:"match_id" db:"match_id"`
	UserID      UserId      `json:"user_id" db:"user_id"`
	Name        string      `json:"name" db:"name"`
	Furigana    string      `json:"furigana" db:"furigana"`
}

type MatchMoms []*MatchMom

type EachMatchMom struct {
	UserID   UserId `json:"user_id" db:"user_id"`
	Name     string `json:"name" db:"name"`
	Furigana string `json:"furigana" db:"furigana"`
}

type EachMatchMoms []*EachMatchMom

type MatchVote struct {
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	MatchID     MatchID     `json:"match_id" db:"match_id"`
	UserID      UserId      `json:"user_id" db:"user_id"`
	TeamID      TeamID      `json:"team_id" db:"team_id"`
	IsVote      bool        `json:"is_vote" db:"is_vote"`
}

type MatchVotes []*MatchVote
