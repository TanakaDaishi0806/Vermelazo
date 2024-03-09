package store

import (
	"context"
	"time"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type ListCategoryTop struct {
	DB Queryer
}

type AddAward struct {
	DB Execer
}

type ListAward struct {
	DB Queryer
}

type DeleteAward struct {
	DBExc Execer
	DBQry Queryer
}

func (lct *ListCategoryTop) ListCategoryTop(ctx context.Context) (*entity.CategoryTop, error) {
	sql_all := `select name,user_id from users order by point desc limit 1`
	sql_GK := `select name,user_id from users where position=1 order by point desc limit 1`
	sql_DF := `select name,user_id from users where position=2 order by point desc limit 1`
	sql_OF := `select name,user_id from users where position=3 order by point desc limit 1`
	sql_goal := `select name,user_id from users order by goal_num desc limit 1`

	var all_top_user []entity.AwardUserInfo
	var gk_top_user []entity.AwardUserInfo
	var df_top_user []entity.AwardUserInfo
	var of_top_user []entity.AwardUserInfo
	var goal_top_user []entity.AwardUserInfo
	var result entity.CategoryTop

	if err := lct.DB.SelectContext(ctx, &all_top_user, sql_all); err != nil {
		return nil, err
	}
	if len(all_top_user) == 1 {
		result.AllTopUserName = all_top_user[0].Name
		result.AllTopUserID = all_top_user[0].UserID
	}
	if err := lct.DB.SelectContext(ctx, &gk_top_user, sql_GK); err != nil {
		return nil, err
	}
	if len(gk_top_user) == 1 {
		result.GKTopUserName = gk_top_user[0].Name
		result.GKTopUserID = gk_top_user[0].UserID
	}
	if err := lct.DB.SelectContext(ctx, &df_top_user, sql_DF); err != nil {
		return nil, err
	}
	if len(df_top_user) == 1 {
		result.DFTopUserName = df_top_user[0].Name
		result.DFTopUserID = df_top_user[0].UserID
	}
	if err := lct.DB.SelectContext(ctx, &of_top_user, sql_OF); err != nil {
		return nil, err
	}
	if len(of_top_user) == 1 {
		result.OFTopUserName = of_top_user[0].Name
		result.OFTopUserID = of_top_user[0].UserID
	}
	if err := lct.DB.SelectContext(ctx, &goal_top_user, sql_goal); err != nil {
		return nil, err
	}
	if len(goal_top_user) == 1 {
		result.GoalTopUserName = goal_top_user[0].Name
		result.GoalTopUserID = goal_top_user[0].UserID
	}

	return &result, nil

}

func (aa *AddAward) AddAward(ctx context.Context, an string, uid entity.UserID) (entity.AwardID, error) {
	sql := `insert into award (award_name,user_id,datetime) values (?,?,?)`

	// 現在の時刻を取得
	now := time.Now()

	result, err := aa.DB.ExecContext(ctx, sql, an, uid, now)

	if err != nil {
		return 0, nil
	}

	id, err := result.LastInsertId()

	if err != nil {
		return 0, nil
	}
	aid := entity.AwardID(id)

	return aid, nil

}

func (la *ListAward) ListAward(ctx context.Context) (entity.Awards, error) {
	sql := `select a.award_id,a.award_name,a.user_id,a.datetime,u.name from award a left join users u on a.user_id=u.user_id`

	type a struct {
		AwardID   entity.AwardID `json:"award_id" db:"award_id"`
		AwardName string         `json:"award_name" db:"award_name"`
		UserID    entity.UserID  `json:"user_id" db:"user_id"`
		DateTime  string         `json:"datetime" db:"datetime"`
		UserName  string         `json:"user_name" db:"name"`
	}

	var as []*a

	var award_list entity.Awards

	if err := la.DB.SelectContext(ctx, &award_list, sql); err != nil {

		errMsg := err.Error()
		if errMsg == "sql: Scan error on column index 3, name \"token_expiration\": unsupported Scan, storing driver.Value type []uint8 into type *time.Time" {
			if err := la.DB.SelectContext(ctx, &as, sql); err != nil {
				return nil, err
			}
			layout := "2006-01-02 15:04:05"
			for i := 0; i < len(as); i++ {
				d, err := time.Parse(layout, as[i].DateTime)
				if err != nil {
					return nil, err
				}
				award_list = append(award_list, &entity.Award{
					AwardID:   as[i].AwardID,
					AwardName: as[i].AwardName,
					UserID:    as[i].UserID,
					DateTime:  d,
					UserName:  as[i].UserName,
				})

			}

			return award_list, nil
		}

		return nil, err
	}

	return award_list, nil
}

func (da *DeleteAward) DeleteAward(ctx context.Context, aid entity.AwardID) (entity.Awards, error) {
	sql_del := `delete from award where award_id=?`

	_, err := da.DBExc.ExecContext(ctx, sql_del, aid)

	if err != nil {
		return nil, err
	}

	la := &ListAward{DB: da.DBQry}

	lists, err := la.ListAward(ctx)

	if err != nil {
		return nil, err
	}

	return lists, nil

}
