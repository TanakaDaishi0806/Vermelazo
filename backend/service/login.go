package service

import (
	"context"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
)

type Login struct {
	JWTer auth.JWTer
	Repo  UserGetter
}

func (l *Login) Login(ctx context.Context, studentID string, pw string) (string, error) {
	u, err := l.Repo.GetUser(ctx, studentID)
	if err != nil {
		return "", err
	}

	if err := u.ComparePassword(pw); err != nil {
		return "", err
	}

	jwt, err := l.JWTer.GenerateToken(ctx, *u)

	if err != nil {
		return "", err
	}

	return string(jwt), err

}
