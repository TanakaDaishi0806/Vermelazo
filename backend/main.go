package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/config"
)

func main() {
	if err := run(context.Background()); err != nil {
		log.Printf("failed to terminated server: %v", err)
		os.Exit(1)
	}
}

func run(ctx context.Context) error {
	cfg, err := config.New()
	if err != nil {
		return err
	}
	port := os.Getenv("PORT")

	l, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	//l, err := net.Listen("tcp", fmt.Sprintf(":%d", cfg.Port))

	if err != nil {
		log.Fatalf("failed to listen port %s: %v", port, err)
		//log.Fatalf("failed to listen port %d: %v", cfg.Port, err)
	}
	url := fmt.Sprintf("http://%s", l.Addr().String())
	log.Printf("start wih: %v", url)

	mux, cleanup, err := Newmux(ctx, cfg)
	defer cleanup()
	if err != nil {
		return err
	}

	s := NewServer(l, mux)
	return s.Run(ctx)
}
