package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	if err := run(); err != nil {
		fmt.Printf("failed to terminated server: %v", err)
		os.Exit(1)
	}
}

func run() error {
	err := http.ListenAndServe(
		":1800",
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Hello,%s!", r.URL.Path[1:])
		}),
	)

	if err != nil {
		return err
	}

	return nil
}
