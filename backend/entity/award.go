package entity

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

type UserID int64
type AwardID int64

type CategoryTop struct {
	AllTopUserName  string `json:"all_top_user_name" db:"all_top_user_name"`
	AllTopUserID    UserID `json:"all_top_user_id" db:"all_top_user_id"`
	GKTopUserName   string `json:"gk_top_user_name" db:"gk_top_user_name"`
	GKTopUserID     UserID `json:"gk_top_user_id" db:"gk_top_user_id"`
	DFTopUserName   string `json:"df_top_user_name" db:"df_top_user_name"`
	DFTopUserID     UserID `json:"df_top_user_id" db:"df_top_user_id"`
	OFTopUserName   string `json:"of_top_user_name" db:"of_top_user_name"`
	OFTopUserID     UserID `json:"of_top_user_id" db:"of_top_user_id"`
	GoalTopUserName string `json:"goal_top_user_name" db:"goal_top_user_name"`
	GoalTopUserID   UserID `json:"goal_top_user_id" db:"goal_top_user_id"`
}

type AwardUserInfo struct {
	Name   string `json:"name" db:"name"`
	UserID UserID `json:"user_id" db:"user_id"`
}

type Award struct {
	AwardID   AwardID   `json:"award_id" db:"award_id"`
	AwardName string    `json:"award_name" db:"award_name"`
	UserID    UserID    `json:"user_id" db:"user_id"`
	DateTime  time.Time `json:"datetime" db:"datetime"`
	UserName  string    `json:"user_name" db:"name"`
}

type Awards []*Award

func StrTOAwardID(r *http.Request) (AwardID, error) {
	param := chi.URLParam(r, "awardID")
	log.Print("param:"+param, r.URL)
	intid, err := strconv.Atoi(param)
	id := AwardID(intid)
	return id, err
}
