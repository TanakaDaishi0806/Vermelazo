package auth

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

const (
	RoleKey      = "role"
	StudentIDKey = "studentID"
	UserIDKey    = "userID"
)

type JWTer struct {
	PrivateKey, PublicKey jwk.Key
}

type CustomClock struct{}

func (c *CustomClock) Now() time.Time {
	return Clocker()
}
func Clocker() time.Time {
	return time.Now()
}

func NewJWTer() (*JWTer, error) {
	j := &JWTer{}
	rawPrivKey, err := os.ReadFile("auth/cert/private.pem")
	if err != nil {
		return nil, err
	}
	privkey, err := parse(rawPrivKey)

	if err != nil {
		return nil, fmt.Errorf("failed in NewJWTer: private key:%w", err)
	}
	rawPubKey, err := os.ReadFile("auth/cert/public.pem")
	if err != nil {
		return nil, err
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
		Claim(UserIDKey, u.ID).
		Build()
	if err != nil {
		return nil, fmt.Errorf("GenerateToken:failed to build token:%w", err)
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

	return token, err
}

type IDKey struct{}
type roleKey struct{}

func (j *JWTer) FillContext(r *http.Request) (*http.Request, error) {
	tok, err := j.GetToken(r.Context(), r)
	log.Printf("a")
	if err != nil {
		return nil, err
	}
	ctx := SetUserID(r.Context(), tok)
	ctx = SetRole(ctx, tok)
	clone := r.Clone(ctx)

	return clone, nil

}

func SetUserID(ctx context.Context, token jwt.Token) context.Context {
	get, ok := token.Get(UserIDKey)
	if !ok {
		return context.WithValue(ctx, IDKey{}, entity.UserId(0)) // デフォルトのUserIDを指定
	}
	getFloat, isFloat := get.(float64)
	if !isFloat {
		return context.WithValue(ctx, IDKey{}, entity.UserId(0)) // float64に変換できない場合はデフォルトのUserIDを指定
	}

	getUserID := entity.UserId(getFloat)
	log.Printf("%d", getUserID)

	return context.WithValue(ctx, IDKey{}, getUserID)
}

func GetUserID(ctx context.Context) (entity.UserId, bool) {
	id, ok := ctx.Value(IDKey{}).(entity.UserId)
	log.Printf("%t", ok)
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
