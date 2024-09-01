package service

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"os"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	"cloud.google.com/go/secretmanager/apiv1/secretmanagerpb"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

type ChangeSecretTokenJson struct{}

func (cstj *ChangeSecretTokenJson) ChangeSecretTokenJson(ctx context.Context, codeurl string) (string, error) {

	s := os.Getenv("CREDENTIALS_JSON")

	b := []byte(s)

	config, err := google.ConfigFromJSON(b, gmail.MailGoogleComScope)

	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
		return "", err
	}

	parsedURL, err := url.Parse(codeurl)

	if err != nil {
		log.Fatalf("Error parsing URL: %v", err)
	}

	// クエリパラメータを取得する
	queryParams := parsedURL.Query()

	// "code" パラメータを抜き出す
	code := queryParams.Get("code")

	if code == "" {
		log.Fatalf("No 'code' parameter found in URL")
	}

	// code を出力
	fmt.Printf("Extracted code: %s\n", code)

	tok, err := config.Exchange(context.TODO(), code)

	if err != nil {
		log.Fatalf("Unable to retrieve token from web: %v", err)
	}

	tokenData, err := json.MarshalIndent(tok, "", "  ")

	if err != nil {
		log.Fatalf("Unable to encode oauth token: %v", err)
	}

	// トークンデータを格納するための構造体を定義
	var token struct {
		AccessToken  string `json:"access_token"`
		TokenType    string `json:"token_type"`
		RefreshToken string `json:"refresh_token"`
		Expiry       string `json:"expiry"`
	}

	// JSONデータを構造体にパース
	err = json.Unmarshal(tokenData, &token)
	if err != nil {
		log.Fatalf("Unable to parse token data: %v", err)
	}

	// access_tokenを別の変数に格納
	accessToken := `{"access_token":"` + token.AccessToken + `","token_type":"` + tok.TokenType + `","refresh_token":"` + token.RefreshToken + `","expiry":"` + token.Expiry + `"}`

	// // access_tokenの値を出力
	// fmt.Printf("Access Token: %s\n", accessToken)

	sp := os.Getenv("SECRET_PATH")

	client, err := secretmanager.NewClient(ctx)
	if err != nil {
		fmt.Printf("1:%v", err)
	}

	// Build the request.
	req := &secretmanagerpb.AddSecretVersionRequest{
		Parent: sp,
		Payload: &secretmanagerpb.SecretPayload{
			Data: []byte(accessToken),
		},
	}

	// Call the API.
	result, err := client.AddSecretVersion(ctx, req)
	if err != nil {
		fmt.Printf("2:%v", err)
	}
	fmt.Printf("Added secret version: %s\n", result.Name)

	return accessToken, nil

}
