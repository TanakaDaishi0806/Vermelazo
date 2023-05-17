package auth

import (
	"context"
	_ "embed"
	"fmt"
	"net/http"
	"time"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

//go:embed cert/private.pem
var rawPrivKey []byte

//go:embed cert/public.pem
var rawPubKey []byte

const (
	RoleKey      = "role"
	StudentIDKey = "studentID"
)

type JWTer struct {
	PrivateKey, PublicKey jwk.Key
	Store                 Store
}

type Store interface {
	Save(ctx context.Context, key string, UserID entity.UserId) error
	Load(ctx context.Context, key string) (entity.UserId, error)
}

type CustomClock struct{}

func (c *CustomClock) Now() time.Time {
	return Clocker()
}
func Clocker() time.Time {
	return time.Now()
}

func NewJWTer(s Store) (*JWTer, error) {
	j := &JWTer{Store: s}
	privkey, err := parse(rawPrivKey)

	if err != nil {
		return nil, fmt.Errorf("failed in NewJWTer: private key:%w", err)
	}
	pubkey, err := parse(rawPubKey)

	if err != nil {
		return nil, fmt.Errorf("failed in NewJWTer: pubric key:%w", err)
	}
	j.PrivateKey = privkey
	j.PublicKey = pubkey

	return j, err

}

func parse(rawkey []byte) (jwk.Key, error) {
	key, err := jwk.ParseKey(rawkey, jwk.WithPEM(true))
	if err != nil {
		return nil, err
	}
	return key, nil

}

func (j *JWTer) GenerateToken(ctx context.Context, u entity.User) ([]byte, error) {
	tok, err := jwt.NewBuilder().
		JwtID(uuid.New().String()).
		Issuer(`github.com/TanakaDaishi0806/Vermelazo`).
		Subject("access_token").
		IssuedAt(time.Now()).
		Expiration(time.Now().Add(30*time.Minute)).
		Claim(RoleKey, int(u.Role)).
		Claim(StudentIDKey, u.StudentID).
		Build()
	if err != nil {
		return nil, fmt.Errorf("GenerateToken:failed to build token:%w", err)
	}

	if err := j.Store.Save(ctx, tok.JwtID(), u.ID); err != nil {
		return nil, err
	}

	signed, err := jwt.Sign(tok, jwt.WithKey(jwa.RS256, j.PrivateKey))
	if err != nil {
		return nil, err
	}

	return signed, err

}

func (j *JWTer) GetToken(ctx context.Context, r *http.Request) (jwt.Token, error) {
	token, err := jwt.ParseRequest(
		r,
		jwt.WithKey(jwa.RS256, j.PublicKey),
		jwt.WithValidate(false),
	)
	if err != nil {
		return nil, err
	}

	clock := &CustomClock{}

	if err := jwt.Validate(token, jwt.WithClock(clock)); err != nil {
		return nil, fmt.Errorf("get token: failed to validate token:%w", err)
	}

	if _, err := j.Store.Load(ctx, token.JwtID()); err != nil {
		return nil, fmt.Errorf("get token: %s expired :%w", token.JwtID(), err)
	}

	return token, err
}

type userIDKey struct{}
type roleKey struct{}

func (j *JWTer) FillContext(r *http.Request) (*http.Request, error) {
	tok, err := j.GetToken(r.Context(), r)
	if err != nil {
		return nil, err
	}
	uid, err := j.Store.Load(r.Context(), tok.JwtID())
	if err != nil {
		return nil, err
	}
	ctx := SetUserID(r.Context(), uid)
	ctx = SetRole(ctx, tok)
	clone := r.Clone(ctx)

	return clone, nil

}

func SetUserID(ctx context.Context, uid entity.UserId) context.Context {
	return context.WithValue(ctx, userIDKey{}, uid)
}

func GetUserID(ctx context.Context) (entity.UserId, bool) {
	id, ok := ctx.Value(userIDKey{}).(entity.UserId)
	return id, ok
}

func SetRole(ctx context.Context, token jwt.Token) context.Context {
	get, ok := token.Get(RoleKey)
	if !ok {
		return context.WithValue(ctx, roleKey{}, "")
	}
	get = int(get.(float64))
	return context.WithValue(ctx, roleKey{}, get)
}
func GetRole(ctx context.Context) (int, bool) {
	role, ok := ctx.Value(roleKey{}).(int)
	return role, ok
}

func IsAdmin(ctx context.Context) bool {
	role, ok := GetRole(ctx)
	if !ok {
		return ok
	}

	return entity.RoleNum(role) == entity.AdminNum
}
