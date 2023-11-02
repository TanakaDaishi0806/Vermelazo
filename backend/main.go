package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
)

func main() {
	if err := run(context.Background()); err != nil {
		log.Printf("failed to terminated server : %v", err)
		os.Exit(1)
	}
}

func run(ctx context.Context) error {
	port := os.Getenv("PORT")

	l, err := net.Listen("tcp", fmt.Sprintf(":%s", port))

	if err != nil {
		log.Fatalf("failed to listen port %s: %v", port, err)
	}
	url := fmt.Sprintf("http://%s", l.Addr().String())
	log.Printf("start wih: %v", url)

	mux, cleanup, err := Newmux(ctx)
	defer cleanup()
	if err != nil {
		return err
	}

	s := NewServer(l, mux)
	return s.Run(ctx)
}
