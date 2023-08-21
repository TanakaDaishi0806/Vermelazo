package store

import (
	"context"
	"errors"
	"fmt"

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
