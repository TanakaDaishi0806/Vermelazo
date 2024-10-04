package entity

import "database/sql"

type TournID int64

type Tournament struct {
	ID          TournID     `json:"tour_id" db:"tour_id"`
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	MatchID     MatchID     `json:"match_id" db:"match_id"`
	TeamIDA     TeamID      `json:"team_id_a" db:"team_id_a"`
	TeamIDB     TeamID      `json:"team_id_b" db:"team_id_b"`
	MatchLevel  int         `json:"match_level" db:"match_level"`
}

type TournamentList struct {
	ID          TournID       `json:"tour_id" db:"tour_id"`
	ClubMatchID ClubMatchID   `json:"club_match_id" db:"club_match_id"`
	MatchID     sql.NullInt64 `json:"match_id" db:"match_id"`
	TeamIDA     sql.NullInt64 `json:"team_id_a" db:"team_id_a"`
	TeamIDB     sql.NullInt64 `json:"team_id_b" db:"team_id_b"`
	MatchLevel  int           `json:"match_level" db:"match_level"`
}

type TournamentResult struct {
	ID          TournID     `json:"tour_id" db:"tour_id"`
	ClubMatchID ClubMatchID `json:"club_match_id" db:"club_match_id"`
	MatchID     MatchID     `json:"match_id" db:"match_id"`
	TeamIDA     TeamID      `json:"team_id_a" db:"team_id_a"`
	TeamIDB     TeamID      `json:"team_id_b" db:"team_id_b"`
	MatchLevel  int         `json:"match_level" db:"match_level"`
	ScoreA      int         `json:"score_a" db:"score_a"`
	ScoreB      int         `json:"score_b" db:"score_b"`
	PkA         int         `json:"pk_a" db:"pk_a"`
	PkB         int         `json:"pk_b" db:"pk_b"`
}

type TournamentResultList struct {
	ID          TournID       `json:"tour_id" db:"tour_id"`
	ClubMatchID ClubMatchID   `json:"club_match_id" db:"club_match_id"`
	MatchID     sql.NullInt64 `json:"match_id" db:"match_id"`
	TeamIDA     sql.NullInt64 `json:"team_id_a" db:"team_id_a"`
	TeamIDB     sql.NullInt64 `json:"team_id_b" db:"team_id_b"`
	MatchLevel  int           `json:"match_level" db:"match_level"`
	ScoreA      sql.NullInt64 `json:"score_a" db:"score_a"`
	ScoreB      sql.NullInt64 `json:"score_b" db:"score_b"`
	PkA         sql.NullInt64 `json:"pk_a" db:"pk_a"`
	PkB         sql.NullInt64 `json:"pk_b" db:"pk_b"`
}

type TournamentTeamList struct {
	TeamID TeamID `json:"team_id"`
	Rank   int    `json:"rank"`
}

type TournamentDB struct {
	ID               TournID     `json:"tour_id" db:"tour_id"`
	ClubMatchID      ClubMatchID `json:"club_match_id" db:"club_match_id"`
	MatchID          MatchID     `json:"match_id" db:"match_id"`
	TeamIDA          TeamID      `json:"team_id_a" db:"team_id_a"`
	TeamIDB          TeamID      `json:"team_id_b" db:"team_id_b"`
	MatchLevel       int         `json:"match_level" db:"match_level"`
	PearentTourID    TournID     `json:"pearent_tour_id" db:"pearent_tour_id"`
	PearentTeamPlace int         `json:"pearent_team_place" db:"pearent_team_place"`
}

type TournamentDBList struct {
	ID               TournID       `json:"tour_id" db:"tour_id"`
	ClubMatchID      ClubMatchID   `json:"club_match_id" db:"club_match_id"`
	MatchID          sql.NullInt64 `json:"match_id" db:"match_id"`
	TeamIDA          sql.NullInt64 `json:"team_id_a" db:"team_id_a"`
	TeamIDB          sql.NullInt64 `json:"team_id_b" db:"team_id_b"`
	MatchLevel       int           `json:"match_level" db:"match_level"`
	PearentTourID    TournID       `json:"pearent_tour_id" db:"pearent_tour_id"`
	PearentTeamPlace int           `json:"pearent_team_place" db:"pearent_team_place"`
}

type NewTournamentMatch struct {
	PearentTourID    TournID `json:"pearent_tour_id" db:"pearent_tour_id"`
	PearentTeamPlace int     `json:"pearent_team_place" db:"pearent_team_place"`
}

type Tournaments []*Tournament

type TournamentLists []*TournamentList

type TournamentResults []*TournamentResult

type TournamentResultLists []*TournamentResultList

type TournamentTeamLists []*TournamentTeamList

type TournamentDBs []*TournamentDB

type TournamentDBLists []*TournamentDBList

type NewTournamentMatchs []*NewTournamentMatch
