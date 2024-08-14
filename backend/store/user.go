package store

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-sql-driver/mysql"
)

type RegisterUser struct {
	DBQry Queryer
	DBExc Execer
}

type GetUser struct {
	DB Queryer
}

type ChangeUserInfo struct {
	DB Execer
}

type ListUserInfo struct {
	DB Queryer
}

type ListAllUsers struct {
	DB Queryer
}

type ChangeUserPassword struct {
	DB Execer
}

type SendMailPasswordReset struct {
	DBQry Queryer
	DBExc Execer
}

type ResetPassword struct {
	DBQry Queryer
	DBExc Execer
}

type EveryYearUpdateData struct {
	DBExc Execer
}

type ListGoalNumRankers struct {
	DBQry Queryer
}

func (ru *RegisterUser) RegisterUser(ctx context.Context, requ *entity.User) error {
	sql := `INSERT INTO users (name,furigana,student_id,password,grade,role,mailaddress,
		position,experience) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`

	_, err := ru.DBExc.ExecContext(ctx, sql, requ.Name, requ.Furigana, requ.StudentID, requ.Password,
		requ.Grade, requ.Role, requ.MailAddress, requ.Position, requ.Experience)
	if err != nil {
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == ErrCodeMySQLDuplicateEntry {
			return fmt.Errorf("cannot create same name user: %w", ErrAlreadyEntry)
		}
		return err
	}

	sql2 := `select user_id from users ORDER BY user_id DESC LIMIT 1`
	var id int64
	if err := ru.DBQry.GetContext(ctx, &id, sql2); err != nil {
		return err
	}
	requ.ID = entity.UserId(id)
	return nil

}

func (gu *GetUser) GetUser(ctx context.Context, studentID string) (*entity.User, error) {
	sql := `select * from users where student_id=$1`

	u := &entity.User{}

	if err := gu.DB.GetContext(ctx, u, sql, studentID); err != nil {
		return nil, err
	}
	return u, nil
}

func (cui *ChangeUserInfo) ChangeUserInfo(ctx context.Context, ui *entity.User) error {
	sql := `update users set name=$1,furigana=$2,student_id=$3,grade=$4,mailaddress=$5,
	position=$6,experience=$7 where user_id=$8`

	_, err := cui.DB.ExecContext(ctx, sql, ui.Name, ui.Furigana, ui.StudentID, ui.Grade,
		ui.MailAddress, ui.Position, ui.Experience, ui.ID)

	if err != nil {
		return err
	}

	return nil
}

func (lui *ListUserInfo) ListUserInfo(ctx context.Context, uid entity.UserId) (*entity.User, error) {
	sql := `select name,furigana,student_id,grade,mailaddress,position,experience from users where user_id=$1`

	u := &entity.User{}

	if err := lui.DB.GetContext(ctx, u, sql, uid); err != nil {
		return nil, err
	}
	return u, nil

}

func (cup *ChangeUserPassword) ChangeUserPassword(ctx context.Context, uid entity.UserId, p string) error {
	sql := `update users set password=$1 where user_id=$2`

	_, err := cup.DB.ExecContext(ctx, sql, p, uid)

	if err != nil {
		return err
	}

	return nil
}

func (smpr *SendMailPasswordReset) GetMailAddress(ctx context.Context, sid string) (string, error) {
	sql1 := `select mailaddress from users where student_id=$1`

	var ma string

	if err := smpr.DBQry.GetContext(ctx, &ma, sql1, sid); err != nil {
		if err == sql.ErrNoRows {
			return "", nil
		}

		return "", err
	}

	return ma, nil
}

func (smpr *SendMailPasswordReset) AddPasswordResetData(ctx context.Context, pr *entity.PasswordReset) error {
	sql := `insert into password_reset (student_id,reset_token,token_expiration) values ($1,$2,$3)`

	_, err := smpr.DBExc.ExecContext(ctx, sql, pr.StudentID, pr.ResetToken, pr.TokenExpiration)

	if err != nil {
		return err
	}

	return nil
}

func (smpr *SendMailPasswordReset) ExistToken(ctx context.Context, token string) (bool, error) {
	sql := `select count(*) from password_reset where reset_token=$1`

	var c int

	if err := smpr.DBQry.GetContext(ctx, &c, sql, token); err != nil {
		return false, err
	}

	if c == 0 {
		return true, nil
	} else {
		return false, nil
	}
}

func (rp *ResetPassword) ResetPassword(ctx context.Context, sid string, p string) error {
	sql := `update users set password=$1 where student_id=$2`

	_, err := rp.DBExc.ExecContext(ctx, sql, p, sid)

	if err != nil {
		return err
	}

	return nil
}

func (rp *ResetPassword) GetTokenData(ctx context.Context, token string) (*entity.PasswordReset, error) {
	sql1 := `select * from password_reset where reset_token=$1`

	var r struct {
		ID              entity.ResetID `json:"reset_id" db:"reset_id"`
		StudentID       string         `json:"student_id" db:"student_id"`
		ResetToken      string         `json:"reset_token" db:"reset_token"`
		TokenExpiration string         `json:"token_expiration" db:"token_expiration"`
	}

	pr := &entity.PasswordReset{}

	if err := rp.DBQry.GetContext(ctx, pr, sql1, token); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		errMsg := err.Error()
		if errMsg == "sql: Scan error on column index 3, name \"token_expiration\": unsupported Scan, storing driver.Value type []uint8 into type *time.Time" {
			if err := rp.DBQry.GetContext(ctx, &r, sql1, token); err != nil {
				if err == sql.ErrNoRows {
					return nil, nil
				}

				return nil, err
			}
			log.Println(r.TokenExpiration)
			layout := "2006-01-02 15:04:05"
			tokenExpiration, err := time.Parse(layout, r.TokenExpiration)
			if err != nil {
				return nil, err
			}
			pr.ID = r.ID
			pr.StudentID = r.StudentID
			pr.ResetToken = r.ResetToken
			pr.TokenExpiration = tokenExpiration
			return pr, nil
		}

		return nil, err
	}

	return pr, nil
}

func (lau *ListAllUsers) ListAllUsers(ctx context.Context) (entity.PositionUserNames, error) {
	sqlgk := `select name,user_id from users where position=1`

	var gk_users entity.UserNames

	if err := lau.DB.SelectContext(ctx, &gk_users, sqlgk); err != nil {
		return nil, err
	}

	sqldf := `select name,user_id from users where position=2`

	var df_users entity.UserNames

	if err := lau.DB.SelectContext(ctx, &df_users, sqldf); err != nil {
		return nil, err
	}

	sqlof := `select name,user_id from users where position=3`

	var of_users entity.UserNames

	if err := lau.DB.SelectContext(ctx, &of_users, sqlof); err != nil {
		return nil, err
	}

	var position_users entity.PositionUserNames

	position_users = append(position_users, &gk_users)
	position_users = append(position_users, &df_users)
	position_users = append(position_users, &of_users)

	return position_users, nil
}

func (eyud *EveryYearUpdateData) EveryYearUpdateData(ctx context.Context) error {
	sql_grade := `UPDATE users SET grade = grade + 1`
	sql_pre_point := `UPDATE users SET pre_point = point`
	sql_point := `UPDATE users SET point = 0`
	sql_accu_goal_num := `UPDATE users SET accu_goal_num = accu_goal_num + goal_num`
	sql_goal_num := `UPDATE users SET goal_num = 0`

	// SQLクエリの実行
	_, err := eyud.DBExc.ExecContext(ctx, sql_grade)
	if err != nil {
		// エラー処理。エラーが発生した場合には適切なエラー処理を行う。
		return err
	}
	// SQLクエリの実行
	_, err = eyud.DBExc.ExecContext(ctx, sql_pre_point)
	if err != nil {
		// エラー処理。エラーが発生した場合には適切なエラー処理を行う。
		return err
	}
	// SQLクエリの実行
	_, err = eyud.DBExc.ExecContext(ctx, sql_point)
	if err != nil {
		// エラー処理。エラーが発生した場合には適切なエラー処理を行う。
		return err
	}
	// SQLクエリの実行
	_, err = eyud.DBExc.ExecContext(ctx, sql_accu_goal_num)
	if err != nil {
		// エラー処理。エラーが発生した場合には適切なエラー処理を行う。
		return err
	}
	// SQLクエリの実行
	_, err = eyud.DBExc.ExecContext(ctx, sql_goal_num)
	if err != nil {
		// エラー処理。エラーが発生した場合には適切なエラー処理を行う。
		return err
	}

	// 成功した場合、nilを返して正常終了。
	return nil

}

func (lgnr *ListGoalNumRankers) ListGoalNumRankers(ctx context.Context) (entity.GoalNumRankers, error) {
	sql := `select name,furigana,goal_num from users where goal_num>0 order by goal_num desc`

	var lists entity.GoalNumRankers
	if err := lgnr.DBQry.SelectContext(ctx, &lists, sql); err != nil {
		return nil, err
	}

	return lists, nil
}
