package main

import (
	"context"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/config"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/handler"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/service"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
)

func Newmux(ctx context.Context, cfg *config.Config) (http.Handler, func(), error) {
	mux := chi.NewRouter()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		_, _ = w.Write([]byte(`{"status": "ok"}`))
	})
	v := validator.New()
	db, cleanup, err := store.New(ctx, cfg)
	if err != nil {
		return nil, cleanup, err
	}
	ru := &handler.RegisterUser{
		Service:   &service.RegisterUser{Repo: &store.RegisterUser{DB: db}},
		Validator: v,
	}
	mux.Post("/register", ru.ServeHTTP)

	rcli, err := store.NewKVS(ctx, cfg)
	if err != nil {
		return nil, cleanup, err
	}
	jwter, err := auth.NewJWTer(rcli)
	if err != nil {
		return nil, cleanup, err
	}

	l := &handler.Login{
		Service: &service.Login{
			JWTer: *jwter,
			Repo:  &store.GetUser{DB: db},
		},
		Validator: v,
	}
	mux.Post("/login", l.ServeHTTP)

	mux.Route("/home", func(r chi.Router) {
		r.Use(handler.AuthMiddleware(jwter))
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			_, _ = w.Write([]byte(`{"message": "home: success login"}`))
		})
	})

	mux.Route("/admin", func(r chi.Router) {
		r.Use(handler.AuthMiddleware(jwter), handler.AdminMiddleware)
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			_, _ = w.Write([]byte(`{"message": "admin: success login"}`))
		})
	})

	return mux, cleanup, err

}
