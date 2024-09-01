package service

import (
	"log"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

type ListAuthUrl struct{}

func (as *ListAuthUrl) ListAuthUrl() (string, error) {
	s := os.Getenv("CREDENTIALS_JSON")
	b := []byte(s)
	config, err := google.ConfigFromJSON(b, gmail.MailGoogleComScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
		return "error", err
	}
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline, oauth2.ApprovalForce)

	return authURL, err

}
