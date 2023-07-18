package service

import (
	"context"
	"fmt"
	"log"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type AddMatch struct {
	Repo MatchAdd
}

type c struct {
	TeamIDA entity.TeamID
	TeamIDB entity.TeamID
}

type cs []c

func (am *AddMatch) AddMatch(ctx context.Context, cmid entity.ClubMatchID, mnum int) (entity.Matchs, error) {
	list, err := am.Repo.GetTeamList(ctx, cmid)
	if err != nil {
		log.Print("GetTeamList")
		return nil, err
	}
	mlist := entity.Matchs{}

	clist := cs{}

	for i := 0; i < len(list)-1; i++ {
		for j := i + 1; j < len(list); j++ {
			clist = append(clist, c{
				TeamIDA: entity.TeamID(list[i]),
				TeamIDB: entity.TeamID(list[j]),
			})
		}
	}

	fmt.Println("clist:", clist)

	result := cs{}

	t1 := list[0]
	t2f := entity.TeamID(-100)

	x := entity.SelectNums{}
	tlist := entity.SelectNums{}

	for _, l := range list {
		tlist = append(tlist, entity.SelectNum{
			TeamID: l,
			Num:    0,
		})
	}

	x = append(x, tlist...)

	for len(clist) > 1 {
		t2 := t2f
		minnum := 100
		tmp := 0
		for j := 0; j < len(clist); j++ {

			if clist[j].TeamIDA == t1 && entity.Contains(x, clist[j].TeamIDB) {
				fmt.Println("len(clist):", len(clist))
				fmt.Println("clist[j]:", clist[j])
				fmt.Println("t1:", t1)
				fmt.Println("t2:", t2)
				for _, l := range x {
					if l.TeamID == clist[j].TeamIDB {
						if minnum > l.Num {
							minnum = l.Num
							tmp = j
						}
					}
				}

			}
			if clist[j].TeamIDB == t1 && entity.Contains(x, clist[j].TeamIDA) {
				fmt.Println("len(clist):", len(clist))
				fmt.Println("clist[j]:", clist[j])
				fmt.Println("t1:", t1)
				fmt.Println("t2:", t2)
				for _, l := range x {
					if l.TeamID == clist[j].TeamIDA {
						if minnum > l.Num {
							minnum = l.Num
							tmp = j
						}
					}
				}

			}
		}

		result = append(result, clist[tmp])

		if clist[tmp].TeamIDA == t1 {
			t2 = clist[tmp].TeamIDB
		} else {
			t2 = clist[tmp].TeamIDA
		}

		for j := 0; j < len(tlist); j++ {
			if tlist[j].TeamID == clist[tmp].TeamIDA {
				tlist[j].Num++
			}
			if tlist[j].TeamID == clist[tmp].TeamIDB {
				tlist[j].Num++
			}
		}

		// j 番目の要素を削除する

		clist = append(clist[:tmp], clist[tmp+1:]...)

		x = entity.SelectNums{}

		for _, l := range tlist {
			if l.TeamID != t1 && l.TeamID != t2 {
				x = append(x, l)
			}
		}
		if len(x) == 1 || t2 == t2f {
			x = entity.SelectNums{}
			x = append(x, tlist...)

		}

		if (t2+1) <= tlist[len(tlist)-1].TeamID && entity.Contains(x, t2+1) {
			fmt.Println("b")
			t1 = t2 + 1
		} else {
			t1 = x[0].TeamID
		}

	}

	result = append(result, clist[0])

	for i := 1; i <= mnum; i++ {
		for _, l := range result {
			mlist = append(mlist, &entity.Match{
				ClubMatchID: cmid,
				TeamIDA:     l.TeamIDA,
				TeamIDB:     l.TeamIDB,
			})

		}
	}

	if err := am.Repo.AddMatch(ctx, mlist); err != nil {
		log.Print("AddMatch")
		return nil, err
	}

	return mlist, nil

}
