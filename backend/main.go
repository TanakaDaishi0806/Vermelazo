package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"time"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/store"
)

func main() {
	ctx := context.Background()
	go func() {
		for {
			// 現在の日付を取得
			now := time.Now()

			// 次に更新を行う日付（毎年4月1日）を指定
			nextUpdateDate := time.Date(now.Year(), time.April, 1, 0, 0, 0, 0, now.Location())

			// 現在の日付が次の更新日を過ぎているかを確認
			if now.After(nextUpdateDate) {
				log.Println("teikijikkou")
				// データベース更新処理
				cleanup, err := updateDatabase(ctx)
				if err != nil {
					log.Fatalf("failed to grade data update: %v", err)
				}
				cleanup()

				// 次の更新日を来年の4月1日に設定
				nextUpdateDate = nextUpdateDate.AddDate(1, 0, 0)
			}

			// 次の更新までの待機時間を計算
			durationUntilNextUpdate := nextUpdateDate.Sub(now)
			log.Println(durationUntilNextUpdate)

			// 次の更新まで待機
			time.Sleep(durationUntilNextUpdate)

		}
	}()
	if err := run(ctx); err != nil {
		log.Printf("failed to terminated server: %v", err)
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

func updateDatabase(ctx context.Context) (func(), error) {
	// データベース更新処理
	db, cleanup, err := store.New(ctx)
	if err != nil {
		return cleanup, err
	}
	updater := store.EveryYearUpdateData{DBExc: db}
	if err := updater.EveryYearUpdateData(ctx); err != nil {
		return cleanup, err
	}
	log.Println("Database updated at", time.Now())
	return cleanup, nil
}
