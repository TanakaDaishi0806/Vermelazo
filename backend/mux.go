package main

import (
	"context"
	"net/http"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/auth"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/handler"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/service"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
)

func Newmux(ctx context.Context) (http.Handler, func(), error) {
	mux := chi.NewRouter()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		_, _ = w.Write([]byte(`{"status": "ok"}`))
	})
	v := validator.New()
	db, cleanup, err := store.New(ctx)
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

	jwter, err := auth.NewJWTer()
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
	am := &handler.AddMatch{
		Service: &service.AddMatch{
			Repo: &store.MatchRepository{DBExc: db, DBQry: db},
		},
		Validator: v,
	}

	lm := &handler.ListMatch{
		Repo: &store.MatchRepository{DBExc: db, DBQry: db},
	}

	as := &handler.AddScore{
		Repo:      &store.MatchRepository{DBExc: db, DBQry: db},
		Validator: v,
	}

	apg := &handler.AddPointGetter{
		Repo:      &store.PointGetterRepository{DBExc: db, DBQry: db},
		Validator: v,
	}

	lpg := &handler.ListPointGetter{
		Repo: &store.PointGetterRepository{DBExc: db, DBQry: db},
	}

	dpg := &handler.DeletePointGetter{
		Repo: &store.PointGetterRepository{DBExc: db, DBQry: db},
	}

	lst := &handler.ListSpecifyTeam{
		Repo: &store.TeamRepository{DBExc: db, DBQry: db},
	}

	scmf := &handler.SwitchClubMatchFinish{
		Repo: &store.SwitchClubMatchFinish{DBExc: db, DBQry: db},
	}

	lpm := &handler.ListPositionMember{
		Repo:      &store.TeamRepository{DBExc: db, DBQry: db},
		Validator: v,
	}
	apm := &handler.AddPositionMom{
		Repo:      &store.VoteRepository{DBExc: db, DBQry: db},
		Validator: v,
	}

	lptm := &handler.ListPositionMom{
		Repo: &store.ListPositionMom{DB: db},
	}

	cpm := &handler.ChangePositionMom{
		Repo:      &store.VoteRepository{DBExc: db, DBQry: db},
		Validator: v,
	}

	vk := &handler.VoteKind{
		Service: &service.VoteKind{
			Repo: &store.VoteRepository{DBExc: db, DBQry: db},
		},
	}

	amtm := &handler.AddMyteamMom{
		Repo:      &store.VoteRepository{DBExc: db, DBQry: db},
		Validator: v,
	}

	amm := &handler.AddMatchMom{
		Repo:      &store.VoteRepository{DBExc: db, DBQry: db},
		Validator: v,
	}

	lmiv := &handler.ListMyIsVote{
		Repo: &store.VoteRepository{DBExc: db, DBQry: db},
	}

	emm := &handler.EachMatchMom{
		Repo: &store.VoteRepository{DBExc: db, DBQry: db},
	}

	mr := &handler.MyRank{
		Service: &service.MyRank{
			Repo: &store.MyRankRepository{DBExc: db, DBQry: db},
		},
	}

	ltr := &handler.ListTeamRank{
		Repo: &store.TeamRankRepository{DBExc: db, DBQry: db},
	}
	ts := &handler.TopScorer{
		Repo: &store.TopScorerRepository{DBExc: db, DBQry: db},
	}

	cui := &handler.ChangeUserInfo{
		Service: &service.ChangeUserInfo{
			Repo: &store.ChangeUserInfo{DB: db},
		},
		Validator: v,
	}

	lui := &handler.ListUserInfo{
		Service: &service.ListUserInfo{
			Repo: &store.ListUserInfo{DB: db},
		},
	}

	cup := &handler.ChangeUserPassword{
		Service: &service.ChangeUserPassword{
			Repo: &store.ChangeUserPassword{DB: db},
		},
		Validator: v,
	}

	lpn := &handler.ListParticipantName{
		Repo: &store.ListParticipantName{DB: db},
	}

	mux.Route("/home", func(r chi.Router) {
		r.Use(handler.CROS, handler.AuthMiddleware(jwter))
		r.Get("/", lcmu.ServeHTTP)
		r.Get("/team/list/{clubMatchId}", lt.ServeHTTP)
		r.Get("/match/list/{clubMatchId}", lm.ServeHTTP)
		r.Get("/pointgetter/list/{matchId}/{teamId}", lpg.ServeHTTP)
		r.Get("/team/specify/list/{teamId}", lst.ServeHTTP)
		r.Get("/mom/position/list/{clubMatchId}", lptm.ServeHTTP)
		r.Get("/votekind/list/{clubMatchId}", vk.ServeHTTP)
		r.Get("/myisvote/list/{clubMatchId}", lmiv.ServeHTTP)
		r.Get("/mom/eachmatch/{matchId}", emm.ServeHTTP)
		r.Get("/myrank/list", mr.ServeHTTP)
		r.Get("/teamrank/list/{clubMatchId}", ltr.ServeHTTP)
		r.Get("/topscorer/list/{clubMatchId}", ts.ServeHTTP)
		r.Get("/userinfo/list", lui.ServeHTTP)
		r.Get("/participantname/list/{clubMatchId}", lpn.ServeHTTP)
		r.Post("/", ap.ServeHTTP)
		r.Post("/teammember/add", atm.ServeHTTP)
		r.Post("/vote/myteam/add", amtm.ServeHTTP)
		r.Post("/vote/match/add", amm.ServeHTTP)
		r.Put("/userinfo/change", cui.ServeHTTP)
		r.Delete("/participant/{clubMatchId}", dp.ServeHTTP)
		r.Delete("/teammember/{clubMatchId}", dtm.ServeHTTP)
	})

	mux.Route("/admin", func(r chi.Router) {
		r.Use(handler.CROS, handler.AuthMiddleware(jwter), handler.AdminMiddleware)
		r.Get("/", lcm.ServeHTTP)
		r.Get("/match/list/{clubMatchId}", lm.ServeHTTP)
		r.Get("/pointgetter/list/{matchId}/{teamId}", lpg.ServeHTTP)
		r.Get("/team/specify/list/{teamId}", lst.ServeHTTP)
		r.Get("/user/position/list/{clubMatchId}/{position}", lpm.ServeHTTP)
		r.Get("/mom/position/list/{clubMatchId}", lptm.ServeHTTP)
		r.Post("/", acm.ServeHTTP)
		r.Post("/team/create", ct.ServeHTTP)
		r.Post("/pointgetter/add", apg.ServeHTTP)
		r.Post("/match/combination/create", am.ServeHTTP)
		r.Post("/mom/position/add", apm.ServeHTTP)
		r.Put("/team/change/{clubMatchId}", chgt.ServeHTTP)
		r.Put("/clubmatchs/{clubMatchId}", ccm.ServeHTTP)
		r.Put("/clubmatchs/isreleased/{clubMatchId}", scmr.ServeHTTP)
		r.Put("/clubmatchs/isfinish/{clubMatchId}", scmf.ServeHTTP)
		r.Put("/match/score/add/{matchId}/{clubMatchId}", as.ServeHTTP)
		r.Put("/mom/position/change/{clubMatchId}", cpm.ServeHTTP)
		r.Put("/password/change", cup.ServeHTTP)
		r.Delete("/clubmatchs/{clubMatchId}", dcm.ServeHTTP)
		r.Delete("/pointgetter/{matchId}", dpg.ServeHTTP)
	})

	return mux, cleanup, nil

}
