package entity

import "golang.org/x/crypto/bcrypt"

type UserId int64
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
	ID          UserId        `json:"id" db:"id"`
	Name        string        `json:"name" db:"name"`
	StudentID   string        `json:"studentID" db:"studentID"`
	Password    string        `json:"password" db:"password"`
	Grade       GradeNum      `json:"grade" db:"grade"`
	Role        RoleNum       `json:"role" db:"role"`
	MailAddress string        `json:"mailaddress" db:"mailaddress"`
	Point       int           `json:"point" db:"point"`
	Position    PositionNum   `json:"position" db:"position"`
	Experience  ExperienceNum `json:"experience" db:"experience"`
	Furigana    string        `json:"furigana" db:"furigana"`
}

func (u *User) ComparePassword(pw string) error {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(pw))
}
