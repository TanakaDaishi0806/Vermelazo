package store

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-sql-driver/mysql"
)

type RegisterUser struct {
	DB Execer
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

func (ru *RegisterUser) RegisterUser(ctx context.Context, requ *entity.User) error {
	sql := `INSERT INTO users (name,furigana,student_id,password,grade,role,mailaddress,
		position,experience) VALUES (?,?,?,?,?,?,?,?,?)`

	result, err := ru.DB.ExecContext(ctx, sql, requ.Name, requ.Furigana, requ.StudentID, requ.Password,
		requ.Grade, requ.Role, requ.MailAddress, requ.Position, requ.Experience)
	if err != nil {
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == ErrCodeMySQLDuplicateEntry {
			return fmt.Errorf("cannot create same name user: %w", ErrAlreadyEntry)
		}
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	requ.ID = entity.UserId(id)
	return nil

}

func (gu *GetUser) GetUser(ctx context.Context, studentID string) (*entity.User, error) {
	sql := `select * from users where student_id=?`

	u := &entity.User{}

	if err := gu.DB.GetContext(ctx, u, sql, studentID); err != nil {
		return nil, err
	}
	return u, nil
}

func (cui *ChangeUserInfo) ChangeUserInfo(ctx context.Context, ui *entity.User) error {
	sql := `update users set name=?,furigana=?,student_id=?,grade=?,mailaddress=?,
	position=?,experience=? where user_id=?`

	_, err := cui.DB.ExecContext(ctx, sql, ui.Name, ui.Furigana, ui.StudentID, ui.Grade,
		ui.MailAddress, ui.Position, ui.Experience, ui.ID)

	if err != nil {
		return err
	}

	return nil
}

func (lui *ListUserInfo) ListUserInfo(ctx context.Context, uid entity.UserId) (*entity.User, error) {
	sql := `select name,furigana,student_id,grade,mailaddress,position,experience 
	from users where user_id=?`

	u := &entity.User{}

	if err := lui.DB.GetContext(ctx, u, sql, uid); err != nil {
		return nil, err
	}
	return u, nil

}

func (cup *ChangeUserPassword) ChangeUserPassword(ctx context.Context, uid entity.UserId, p string) error {
	sql := `update users set password=? where user_id=?`

	_, err := cup.DB.ExecContext(ctx, sql, p, uid)

	if err != nil {
		return err
	}

	return nil
}

func (smpr *SendMailPasswordReset) GetMailAddress(ctx context.Context, sid string) (string, error) {
	sql1 := `select mailaddress from users where student_id=?`

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
	sql := `insert into password_reset (student_id,reset_token,token_expiration) values (?,?,?)`

	_, err := smpr.DBExc.ExecContext(ctx, sql, pr.StudentID, pr.ResetToken, pr.TokenExpiration)

	if err != nil {
		return err
	}

	return nil
}

func (smpr *SendMailPasswordReset) ExistToken(ctx context.Context, token string) (bool, error) {
	sql := `select count(*) from password_reset where reset_token=?`

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
	sql := `update users set password=? where student_id=?`

	_, err := rp.DBExc.ExecContext(ctx, sql, p, sid)

	if err != nil {
		return err
	}

	return nil
}

func (rp *ResetPassword) GetTokenData(ctx context.Context, token string) (*entity.PasswordReset, error) {
	sql1 := `select * from password_reset where reset_token=?`

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
			if err := rp.DBQry.GetContext(ctx, r, sql1, token); err != nil {
				if err == sql.ErrNoRows {
					return nil, nil
				}

				return nil, err
			}
			tokenExpiration, err := time.Parse(time.RFC3339, r.TokenExpiration)
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
