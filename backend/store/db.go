package store

import (
	"context"
	"database/sql"
	"errors"
	"os"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

const (
	// ErrCodeMySQLDuplicateEntry はMySQL系のDUPLICATEエラーコード
	// https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html
	// Error number: 1062; Symbol: ER_DUP_ENTRY; SQLSTATE: 23000
	ErrCodeMySQLDuplicateEntry = 1062
)

var (
	ErrAlreadyEntry = errors.New("duplicate entry")
)

func New(ctx context.Context) (*sqlx.DB, func(), error) {

	// user := os.Getenv("DB_USER")
	// password := os.Getenv("DB_PASSWORD")
	// host := os.Getenv("HOST_PRODUCT")
	// dbName := os.Getenv("DB_NAME")
	// port := os.Getenv("DB_PORT")     // PostgreSQLのポートを指定します。デフォルトは5432です。
	// sslMode := os.Getenv("SSL_MODE") // SSLモードを設定します。例: "disable" or "require"
	// connectionString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", host, port, user, password, dbName, sslMode)

	// PostgreSQLに接続するための接続文字列を作成します。
	connectionString := os.Getenv("DB")

	db, err := sqlx.Open("postgres", connectionString)
	if err != nil {
		return nil, func() {}, err
	}

	// コンテキストを使用して接続をテストします。
	ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		return nil, func() { _ = db.Close() }, err
	}

	// 接続が成功した場合、sqlx.DBインスタンスとクローザー関数を返します。
	return db, func() { _ = db.Close() }, nil

	// user := os.Getenv("DB_USER")
	// password := os.Getenv("DB_PASSWORD")
	// host := os.Getenv("HOST_PRODUCT")
	// dbName := os.Getenv("DB_NAME")
	// option := os.Getenv("OPTION")
	// db, err := sql.Open("mysql",
	// 	fmt.Sprintf("%s:%s@tcp(%s)/%s?%s", user, password, host, dbName, option),
	// )
	// log.Printf("%s:%s@tcp(%s)/%s?%s", user, password, host, dbName, option)
	// if err != nil {
	// 	return nil, func() {}, err
	// }
	// ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
	// defer cancel()

	// if err := db.PingContext(ctx); err != nil {
	// 	return nil, func() { _ = db.Close() }, err
	// }
	// xdb := sqlx.NewDb(db, "mysql")
	// return xdb, func() { _ = db.Close() }, err
}

type Beginner interface {
	BeginTx(ctx context.Context, opts *sql.TxOptions) (*sql.Tx, error)
}

type Preparer interface {
	PreparexContext(ctx context.Context, query string) (*sqlx.Stmt, error)
}

type Execer interface {
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
	NamedExecContext(ctx context.Context, query string, arg interface{}) (sql.Result, error)
}

type Queryer interface {
	Preparer
	QueryxContext(ctx context.Context, query string, args ...any) (*sqlx.Rows, error)
	QueryRowxContext(ctx context.Context, query string, args ...any) *sqlx.Row
	GetContext(ctx context.Context, dest interface{}, query string, args ...any) error
	SelectContext(ctx context.Context, dest interface{}, query string, args ...any) error
}

var (
	// インターフェースが期待通りに宣言されているか確認
	_ Beginner = (*sqlx.DB)(nil)
	_ Preparer = (*sqlx.DB)(nil)
	_ Queryer  = (*sqlx.DB)(nil)
	_ Execer   = (*sqlx.DB)(nil)
	_ Execer   = (*sqlx.Tx)(nil)
)
