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

	mux.Route("/register", func(r chi.Router) {
		r.Use(handler.CROS)
		r.Post("/", ru.ServeHTTP)
	})

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

	mux.Route("/login", func(r chi.Router) {
		r.Use(handler.CROS)
		r.Post("/", l.ServeHTTP)
	})

	acm := &handler.AddClubMatch{
		Repo:      &store.AddClubMatch{DB: db},
		Validator: v,
	}

	lcm := &handler.ListClubMatch{
		Repo: &store.ListClubMatch{DB: db},
	}

	ccm := &handler.ChangeClubMatch{
		Repo:      &store.ChangeClubMatch{DB: db},
		Validator: v,
	}

	dcm := &handler.DeleteClubMatch{
		Repo: &store.DeleteClubMatch{DBExc: db, DBQry: db},
	}

	scmr := &handler.SwitchClubMatchReleased{
		Service: &service.SwitchClubMatchReleased{
			Repo: &store.SwitchClubMatchReleased{DBExc: db, DBQry: db},
		},
		Validator: v,
	}

	lcmu := &handler.ListClubMatchUsers{
		Service: &service.ListClubMatchUsers{
			Repo: &store.ListParticipant{DB: db},
		},
	}

	ap := &handler.AddParticipant{
		Service: &service.AddParticipant{
			Repo: &store.AddParticipant{DBExc: db, DBQry: db},
		},
		Validator: v,
	}

	dp := &handler.DeleteParticipant{
		Service: &service.DeleteParticipant{
			Repo: &store.DeleteParticipant{DBExc: db, DBQry: db},
		},
	}

	ct := &handler.CreateTeam{
		Service: &service.CreateTeam{
			Repo: &store.TeamRepository{DBExc: db, DBQry: db},
		},
		Validator: v,
	}
	chgt := &handler.ChangeTeam{
		Service: &service.ChangeTeam{
			Repo: &store.TeamRepository{DBExc: db, DBQry: db},
		},
		Validator: v,
	}

	dtm := &handler.DeleteTeamMember{
		Service: &service.DeleteTeamMember{
			Repo: &store.TeamRepository{DBExc: db, DBQry: db},
		},
	}

	lt := &handler.ListTeam{
		Service: &service.ListTeam{
			Repo: &store.TeamRepository{DBExc: db, DBQry: db},
		},
	}
	atm := &handler.AddTeamMember{
		Service: &service.AddTeamMember{
			Repo: &store.TeamRepository{DBExc: db, DBQry: db},
		},
		Validator: v,
	}

	mux.Route("/home", func(r chi.Router) {
		r.Use(handler.CROS, handler.AuthMiddleware(jwter))
		r.Get("/", lcmu.ServeHTTP)
		r.Get("/team/list/{clubMatchId}", lt.ServeHTTP)
		r.Post("/", ap.ServeHTTP)
		r.Post("/teammember/add", atm.ServeHTTP)
		r.Delete("/participant/{clubMatchId}", dp.ServeHTTP)
		r.Delete("/teammember/{clubMatchId}", dtm.ServeHTTP)
	})

	mux.Route("/admin", func(r chi.Router) {
		r.Use(handler.CROS, handler.AuthMiddleware(jwter), handler.AdminMiddleware)
		r.Get("/", lcm.ServeHTTP)
		r.Get("/team/list/{clubMatchId}", lt.ServeHTTP)
		r.Post("/", acm.ServeHTTP)
		r.Post("/team/create", ct.ServeHTTP)
		r.Put("/team/change/{clubMatchId}", chgt.ServeHTTP)
		r.Put("/clubmatchs/{clubMatchId}", ccm.ServeHTTP)
		r.Put("/clubmatchs/isreleased/{clubMatchId}", scmr.ServeHTTP)
		r.Delete("/clubmatchs/{clubMatchId}", dcm.ServeHTTP)
	})

	return mux, cleanup, nil

}
