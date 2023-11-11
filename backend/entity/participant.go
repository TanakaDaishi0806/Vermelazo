package entity

type PaticipantID int64

type Paticipant struct {
	ID          PaticipantID `json:"paticipant_id" db:"paticipant_id"`
	ClubMatchID ClubMatchID  `json:"club_match_id" db:"club_match_id"`
	UserID      UserId       `json:"user_id" db:"user_id"`
}

type ParticipantInfo struct {
	Name     string `json:"name" db:"name"`
	Furigana string `json:"furigana" db:"furigana"`
}

type ParticipantInfos []*ParticipantInfo
