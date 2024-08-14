package entity

import (
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"golang.org/x/crypto/bcrypt"
)

type UserId int64
type ResetID int64
type GradeNum int
type RoleNum int
type PositionNum int
type ExperienceNum int

const (
	GradeBOne   GradeNum = 1
	GradeBTwo   GradeNum = 2
	GradeBThree GradeNum = 3
	GradeBFore  GradeNum = 4
	GradeMOne   GradeNum = 5
	GradeMTwo   GradeNum = 6
)

const (
	NoAdminNum RoleNum = 0 //ユーザー
	AdminNum   RoleNum = 1 //管理者
)

const (
	GK PositionNum = 1
	DF PositionNum = 2
	OF PositionNum = 3
)

const (
	ExperienceZero  ExperienceNum = 0 //一回もサーカー部に入ったことがない
	ExperienceOne   ExperienceNum = 1 //小学校または中学校までサッカー部に入っていた
	ExperienceTwo   ExperienceNum = 2 //高校までサッカー部に入っていた
	ExperienceThree ExperienceNum = 3 //大学でもサッカー部またはフットサル部に入っている
)

type User struct {
	ID          UserId        `json:"user_id" db:"user_id"`
	Name        string        `json:"name" db:"name"`
	Furigana    string        `json:"furigana" db:"furigana"`
	StudentID   string        `json:"student_id" db:"student_id"`
	Password    string        `json:"password" db:"password"`
	Grade       GradeNum      `json:"grade" db:"grade"`
	Role        RoleNum       `json:"role" db:"role"`
	MailAddress string        `json:"mailaddress" db:"mailaddress"`
	Point       int           `json:"point" db:"point"`
	Position    PositionNum   `json:"position" db:"position"`
	Experience  ExperienceNum `json:"experience" db:"experience"`
	GoalNum     int           `json:"goal_num" db:"goal_num"`
	AccuGoalNum int           `json:"accu_goal_num" db:"accu_goal_num"`
	PrePoint    int           `json:"pre_point" db:"pre_point"`
}

type Users []*User

type UserName struct {
	ID   UserId `json:"user_id" db:"user_id"`
	Name string `json:"name" db:"name"`
}

type UserNames []*UserName

type PositionUserNames []*UserNames

type AuthenticationInfo struct {
	StudentID   string `json:"student_id" db:"student_id"`
	MailAddress string `json:"mailaddress" db:"mailaddress"`
}

type PasswordReset struct {
	ID              ResetID   `json:"reset_id" db:"reset_id"`
	StudentID       string    `json:"student_id" db:"student_id"`
	ResetToken      string    `json:"reset_token" db:"reset_token"`
	TokenExpiration time.Time `json:"token_expiration" db:"token_expiration"`
}

type GoalNumUser struct {
	Name     string `json:"name" db:"name"`
	Furigana string `json:"furigana" db:"furigana"`
	GoalNum  int    `json:"goal_num" db:"goal_num"`
}

type GoalNumRankers []*GoalNumUser

func (u *User) ComparePassword(pw string) error {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(pw))
}

func StrTOPosition(r *http.Request) (PositionNum, error) {
	param := chi.URLParam(r, "position")
	log.Print("param:"+param, r.URL)
	intid, err := strconv.Atoi(param)
	id := PositionNum(intid)
	return id, err
}

func CreateToken(n int) string {
	var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[r.Intn(len(letterRunes))]
	}
	return string(b)
}
