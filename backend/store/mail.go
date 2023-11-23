package store

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"golang.org/x/text/encoding/japanese"
	"golang.org/x/text/transform"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"
)

func SendMail(ctx context.Context, to string, subject string, content string) error {
	from := os.Getenv("FROM_MAILADDRESS") // 送信元メールアドレス
	s := os.Getenv("CREDENTIALS_JSON")
	b := []byte(s)
	config, err := google.ConfigFromJSON(b, gmail.MailGoogleComScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
		return err
	}
	client := getClient(config)

	srv, err := gmail.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		log.Fatalf("Unable to retrieve Gmail client: %v", err)
		return err
	}
	fmt.Println("Created Gmail service", srv)
	//追記
	msgStr := "From: 'me'\r\n" +
		"reply-to: " + from + "\r\n" + //送信元
		"To:" + to + "\r\n" + //送信先
		"Subject: " + subject + "\r\n" +
		"\r\n" + content
	reader := strings.NewReader(msgStr)
	transformer := japanese.ISO2022JP.NewEncoder()
	msgISO2022JP, err := io.ReadAll(transform.NewReader(reader, transformer))
	if err != nil {
		log.Fatalf("Unable to convert to ISO2022JP: %v", err)
		return err
	}
	msg := []byte(msgISO2022JP)
	message := gmail.Message{}
	message.Raw = base64.StdEncoding.EncodeToString(msg)
	_, err = srv.Users.Messages.Send("me", &message).Do()
	if err != nil {
		fmt.Printf("%v", err)
		return err
	}

	return nil
}

func getClient(config *oauth2.Config) *http.Client {

	// tokFile := "token.json"
	// tok, err := tokenFromFile(tokFile)
	// if err != nil {
	// 	tok = getTokenFromWeb(config)
	// 	saveToken(tokFile, tok)
	// }
	tokenJSON := os.Getenv("TOKEN_JSON")
	var tok *oauth2.Token
	if err := json.Unmarshal([]byte(tokenJSON), &tok); err != nil {
		// エラーの処理
		panic(err)
	}

	return config.Client(context.Background(), tok)
}
