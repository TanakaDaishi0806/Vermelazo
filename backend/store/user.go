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

func (ru *RegisterUser) RegisterUser(ctx context.Context, requ *entity.User) error {
	sql := `INSERT INTO personal_info (name,studentID,password,grade,role,mailaddress,
		position,experience,furigana) VALUES (?,?,?,?,?,?,?,?,?)`

	result, err := ru.DB.ExecContext(ctx, sql, requ.Name, requ.StudentID, requ.Password,
		requ.Grade, requ.Role, requ.MailAddress, requ.Position, requ.Experience, requ.Furigana)
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
	sql := `select * from personal_info where studentID=?`

	u := &entity.User{}

	if err := gu.DB.GetContext(ctx, u, sql, studentID); err != nil {
		return nil, err
	}
	return u, nil
}
