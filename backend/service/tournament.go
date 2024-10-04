package service

import (
	"context"
	"fmt"
	"sort"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
)

type Tournament struct {
	Repo TournamentRepository
}

// TreeNode は木の1つのノードを表す構造体
type TreeNode struct {
	value  int
	tourID entity.TournID
	left   *TreeNode
	right  *TreeNode
}

// NewTreeNode は新しいノードを作成する関数
func NewTreeNode(parent *TreeNode, v_right int, depth_num int, tID entity.TournID) (*TreeNode, entity.TournID) {
	fmt.Printf("tID:%d ", tID)
	if parent == nil {
		//ルート
		return &TreeNode{value: v_right, tourID: tID, left: nil, right: nil}, tID

	} else {
		//ルート以外で出力は,親,左の葉,右の葉

		parent.left = &TreeNode{value: parent.value, tourID: tID, left: nil, right: nil}
		tID++
		parent.right = &TreeNode{value: v_right, tourID: tID, left: nil, right: nil}
		parent.value = depth_num
		return parent, tID
	}

}

func LeftLeafParentsValues(node *TreeNode, parent *TreeNode) ([]int, []int, []*TreeNode) {
	if node == nil {
		return nil, nil, nil
	}

	var depths []int
	var values []int
	var leaf_nodes []*TreeNode

	// 葉ノードであるかを確認 (子がいないノード)
	if node.left == nil && node.right == nil {
		if parent != nil {
			// 葉ノードの親を出力
			fmt.Printf("Leaf node: %d, Parent: %d\n", node.value, parent.value)
			return []int{parent.value}, []int{node.value}, []*TreeNode{parent.left}
		}
		return nil, nil, nil

	}

	// 左の子を探索
	left_depths, left_values, left_leaf_nodes := LeftLeafParentsValues(node.left, node)
	depths = append(depths, left_depths...)
	values = append(values, left_values...)
	leaf_nodes = append(leaf_nodes, left_leaf_nodes...)

	// 右の子を探索
	right_depths, right_values, right_leaf_nodes := RightLeafParentsValues(node.right, node)
	depths = append(depths, right_depths...)
	values = append(values, right_values...)
	leaf_nodes = append(leaf_nodes, right_leaf_nodes...)

	return depths, values, leaf_nodes
}

func RightLeafParentsValues(node *TreeNode, parent *TreeNode) ([]int, []int, []*TreeNode) {
	if node == nil {
		return nil, nil, nil
	}

	var depths []int
	var values []int
	var leaf_nodes []*TreeNode

	// 葉ノードであるかを確認 (子がいないノード)
	if node.left == nil && node.right == nil {
		if parent != nil {
			// 葉ノードの親を出力
			fmt.Printf("Right node: %d, Parent: %d\n", node.value, parent.value)
			return []int{parent.value}, []int{node.value}, []*TreeNode{parent.right}
		}
		return nil, nil, nil

	}

	// 左の子を探索
	left_depths, left_values, left_leaf_nodes := LeftLeafParentsValues(node.left, node)
	depths = append(depths, left_depths...)
	values = append(values, left_values...)
	leaf_nodes = append(leaf_nodes, left_leaf_nodes...)

	// 右の子を探索
	right_depths, right_values, right_leaf_nodes := RightLeafParentsValues(node.right, node)
	depths = append(depths, right_depths...)
	values = append(values, right_values...)
	leaf_nodes = append(leaf_nodes, right_leaf_nodes...)

	return depths, values, leaf_nodes
}

func allElementsEqual(depths []int) int {
	if len(depths) == 0 {
		return 0 // 空のスライスは全ての要素が同じとみなす
	}

	// 最初の要素を基準として、他の要素と比較
	first := depths[0]
	for _, value := range depths {
		if value != first {
			if value > first {
				return value
			} else {
				return first
			}
		}
	}
	return first // すべての要素が同じならtrueを返す
}

func DecideNewTreeNodeLeef(depths []int, values []int, leaf_nodes []*TreeNode) (int, *TreeNode) {
	depth := allElementsEqual(depths)

	var weak_value int
	var weak_node *TreeNode

	weak_value = 0
	weak_node = nil

	for i := 0; i < len(depths); i++ {
		if depth == depths[i] {
			if weak_value < values[i] {
				weak_value = values[i]
				weak_node = leaf_nodes[i]
			}
		}
	}

	return depth - 1, weak_node

}

// BFS を使って木構造を深さ順に出力する関数
func PrintLevelOrder(root *TreeNode) {
	fmt.Printf("tree\n")
	if root == nil {
		return
	}

	// キューを使ってノードを探索
	queue := []*TreeNode{root} // キューに最初にルートノードを入れる

	for len(queue) > 0 {
		// キューの先頭からノードを取り出す
		current := queue[0]
		queue = queue[1:] // キューから取り除く

		// 現在のノードの値を出力
		fmt.Printf("%d ", current.tourID)

		// 左の子があればキューに追加
		if current.left != nil {
			queue = append(queue, current.left)
		}

		// 右の子があればキューに追加
		if current.right != nil {
			queue = append(queue, current.right)
		}
	}
}

func TournamentsList(ctx context.Context, root *TreeNode, cmid entity.ClubMatchID, t *Tournament, ptid entity.TournID, ptp int) (entity.TournamentDBs, error) {
	if root == nil {
		return nil, nil
	}
	if root.left == nil && root.right == nil {
		return nil, nil
	}
	var list entity.TournamentDBs
	var temp entity.TournamentDBs
	fmt.Printf("tournamentlist\n")
	fmt.Printf("new parent value: %d, left value: %d,right value: %d\n", root.value, root.left.value, root.right.value)

	t_left_list, err := TournamentsList(ctx, root.left, cmid, t, root.tourID, 1)
	if err != nil {
		return nil, err
	}
	list = append(list, t_left_list...)
	t_right_list, err := TournamentsList(ctx, root.right, cmid, t, root.tourID, 2)
	if err != nil {
		return nil, err
	}
	list = append(list, t_right_list...)

	fmt.Printf("a1")
	team_rank_list, err := t.Repo.ListTeamRank(ctx, cmid)
	if err != nil {
		return nil, err
	}
	if root.left.left == nil && root.right.left == nil {
		fmt.Printf("a2")
		m := entity.Match{
			ClubMatchID: cmid,
			TeamIDA:     team_rank_list[root.left.value-1].TeamID,
			TeamIDB:     team_rank_list[root.right.value-1].TeamID,
		}
		mid, err := t.Repo.AddMatch(ctx, m)
		if err != nil {
			return nil, err
		}
		fmt.Printf("match_id: %d", mid)
		// 新しいTournamentの要素を作成
		newTournament := &entity.TournamentDB{
			ID:               root.tourID,
			ClubMatchID:      cmid,
			MatchID:          mid,
			TeamIDA:          team_rank_list[root.left.value-1].TeamID,
			TeamIDB:          team_rank_list[root.right.value-1].TeamID,
			MatchLevel:       -1 - root.value,
			PearentTourID:    ptid,
			PearentTeamPlace: ptp,
		}

		temp = append(temp, newTournament)

		// listに新しい要素を追加
		list = append(temp, list...)
		return list, nil
	} else if root.left.left == nil {
		fmt.Printf("a3")
		// 新しいTournamentの要素を作成
		newTournament := &entity.TournamentDB{
			ID:               root.tourID,
			ClubMatchID:      cmid,
			TeamIDA:          team_rank_list[root.left.value-1].TeamID,
			MatchLevel:       -1 - root.value,
			PearentTourID:    ptid,
			PearentTeamPlace: ptp,
		}

		temp = append(temp, newTournament)

		// listに新しい要素を追加
		list = append(temp, list...)
		return list, nil

	} else if root.right.left == nil {
		fmt.Printf("a4")
		// 新しいTournamentの要素を作成
		newTournament := &entity.TournamentDB{
			ID:               root.tourID,
			ClubMatchID:      cmid,
			TeamIDB:          team_rank_list[root.right.value-1].TeamID,
			MatchLevel:       -1 - root.value,
			PearentTourID:    ptid,
			PearentTeamPlace: ptp,
		}

		temp = append(temp, newTournament)

		// listに新しい要素を追加
		list = append(temp, list...)

		return list, nil

	} else if root.left.left != nil && root.right.left != nil {
		fmt.Printf("a5")
		// 新しいTournamentの要素を作成
		newTournament := &entity.TournamentDB{
			ID:               root.tourID,
			ClubMatchID:      cmid,
			MatchLevel:       -1 - root.value,
			PearentTourID:    ptid,
			PearentTeamPlace: ptp,
		}

		temp = append(temp, newTournament)

		// listに新しい要素を追加
		list = append(temp, list...)

		return list, nil

	}

	return list, nil

}

func PreTournamentsList(ctx context.Context, root *TreeNode, cmid entity.ClubMatchID, t *Tournament) (entity.Tournaments, error) {
	if root == nil {
		return nil, nil
	}
	if root.left == nil && root.right == nil {
		return nil, nil
	}
	var list entity.Tournaments
	var temp entity.Tournaments
	fmt.Printf("tournamentlist\n")
	fmt.Printf("new parent value: %d, left value: %d,right value: %d\n", root.value, root.left.value, root.right.value)

	t_left_list, err := PreTournamentsList(ctx, root.left, cmid, t)
	if err != nil {
		return nil, err
	}
	list = append(list, t_left_list...)
	t_right_list, err := PreTournamentsList(ctx, root.right, cmid, t)
	if err != nil {
		return nil, err
	}
	list = append(list, t_right_list...)

	fmt.Printf("a1")

	if root.left.left == nil && root.right.left == nil {
		// 新しいTournamentの要素を作成
		newTournament := &entity.Tournament{
			ClubMatchID: cmid,
			TeamIDA:     entity.TeamID(root.left.value),
			TeamIDB:     entity.TeamID(root.right.value),
			MatchLevel:  -1 - root.value,
		}

		temp = append(temp, newTournament)

		// listに新しい要素を追加
		list = append(temp, list...)
		return list, nil
	} else if root.left.left == nil {
		fmt.Printf("a3")
		// 新しいTournamentの要素を作成
		newTournament := &entity.Tournament{
			ClubMatchID: cmid,
			TeamIDA:     entity.TeamID(root.left.value),
			MatchLevel:  -1 - root.value,
		}

		temp = append(temp, newTournament)

		// listに新しい要素を追加
		list = append(temp, list...)
		return list, nil

	} else if root.right.left == nil {
		fmt.Printf("a4")
		// 新しいTournamentの要素を作成
		newTournament := &entity.Tournament{
			ClubMatchID: cmid,
			TeamIDB:     entity.TeamID(root.right.value),
			MatchLevel:  -1 - root.value,
		}

		temp = append(temp, newTournament)

		// listに新しい要素を追加
		list = append(temp, list...)

		return list, nil

	} else if root.left.left != nil && root.right.left != nil {
		fmt.Printf("a5")
		// 新しいTournamentの要素を作成
		newTournament := &entity.Tournament{
			ClubMatchID: cmid,
			MatchLevel:  -1 - root.value,
		}

		temp = append(temp, newTournament)

		// listに新しい要素を追加
		list = append(temp, list...)

		return list, nil

	}

	fmt.Printf("unchiburiburi")

	return list, nil

}

// 葉ノードを配列に左から順に追加する関数
func CollectLeaves(node *TreeNode, tr entity.TeamRanks, trl *entity.TournamentTeamLists) {
	if node == nil {
		return
	}

	// 葉ノードであるかどうかを確認
	if node.left == nil && node.right == nil {
		t1 := &entity.TournamentTeamList{
			TeamID: tr[node.value-1].TeamID,
			Rank:   node.value,
		}
		*trl = append(*trl, t1)
		return
	}

	// 左の子ノードを再帰的に探索
	CollectLeaves(node.left, tr, trl)
	// 右の子ノードを再帰的に探索
	CollectLeaves(node.right, tr, trl)
}

func (t *Tournament) CreateTournament(ctx context.Context, cid entity.ClubMatchID) (entity.Tournaments, error) {
	team_num, err := t.Repo.GetTeamNum(ctx, cid)
	if err != nil {
		return nil, err
	}

	tourID, err := t.Repo.GetTournamenID(ctx)
	if err != nil {
		return nil, err
	}
	tourID++
	root, tourID := NewTreeNode(nil, 1, 0, tourID)
	tourID++
	root, tourID = NewTreeNode(root, 2, -1, tourID)
	tourID++
	fmt.Printf("root value: %d, left value: %d,right value: %d\n", root.value, root.left.value, root.right.value)
	// fmt.Printf("right pointa: %p,%d", root.right, root.right.value)
	// fmt.Printf("right pointa: %p,%d", r, r.value)

	for i := 3; i <= team_num; i++ {
		depths, values, leaf_nodes := LeftLeafParentsValues(root, nil)
		next_depth, next_node := DecideNewTreeNodeLeef(depths, values, leaf_nodes)
		//fmt.Printf("next_node pointa: %p", next_node)

		_, tourID = NewTreeNode(next_node, i, next_depth, tourID)
		tourID++
		// fmt.Printf("new parent value: %d, left value: %d,right value: %d\n", new_node.value, new_node.left.value, new_node.right.value)
		PrintLevelOrder(root)
	}

	lists, err := TournamentsList(ctx, root, cid, t, -1, 0)
	if err != nil {
		return nil, err
	}

	req := entity.Tournaments{}

	for _, l := range lists {
		req = append(req, &entity.Tournament{
			ID:          l.ID,
			ClubMatchID: l.ClubMatchID,
			MatchID:     l.MatchID,
			TeamIDA:     l.TeamIDA,
			TeamIDB:     l.TeamIDB,
			MatchLevel:  l.MatchLevel,
		})

	}

	if len(lists) != 0 {
		if err := t.Repo.CreateTournament(ctx, lists); err != nil {
			return nil, err
		}

	}

	return req, nil

}

func (t *Tournament) ListPreTournament(ctx context.Context, cid entity.ClubMatchID) (entity.Tournaments, error) {

	team_num, err := t.Repo.GetTeamNum(ctx, cid)
	if err != nil {
		return nil, err
	}
	tourID, err := t.Repo.GetTournamenID(ctx)
	if err != nil {
		return nil, err
	}
	tourID++
	root, tourID := NewTreeNode(nil, 1, 0, tourID)
	tourID++
	root, tourID = NewTreeNode(root, 2, -1, tourID)
	tourID++
	fmt.Printf("root value: %d, left value: %d,right value: %d\n", root.value, root.left.value, root.right.value)
	// fmt.Printf("right pointa: %p,%d", root.right, root.right.value)
	// fmt.Printf("right pointa: %p,%d", r, r.value)

	for i := 3; i <= team_num; i++ {
		depths, values, leaf_nodes := LeftLeafParentsValues(root, nil)
		next_depth, next_node := DecideNewTreeNodeLeef(depths, values, leaf_nodes)
		//fmt.Printf("next_node pointa: %p", next_node)

		_, tourID = NewTreeNode(next_node, i, next_depth, tourID)
		tourID++
		// fmt.Printf("new parent value: %d, left value: %d,right value: %d\n", new_node.value, new_node.left.value, new_node.right.value)
		PrintLevelOrder(root)
	}

	lists, err := PreTournamentsList(ctx, root, cid, t)
	if err != nil {
		return nil, err
	}
	sort.Slice(lists, func(i, j int) bool {
		return lists[i].MatchLevel < lists[j].MatchLevel
	})

	return lists, nil

}

func (t *Tournament) ListTournamentTeamAndRank(ctx context.Context, cid entity.ClubMatchID) (entity.TournamentTeamLists, error) {
	team_num, err := t.Repo.GetTeamNum(ctx, cid)
	if err != nil {
		return nil, err
	}
	tourID, err := t.Repo.GetTournamenID(ctx)
	if err != nil {
		return nil, err
	}
	tourID++
	root, tourID := NewTreeNode(nil, 1, 0, tourID)
	tourID++
	root, tourID = NewTreeNode(root, 2, -1, tourID)
	tourID++
	fmt.Printf("root value: %d, left value: %d,right value: %d\n", root.value, root.left.value, root.right.value)
	// fmt.Printf("right pointa: %p,%d", root.right, root.right.value)
	// fmt.Printf("right pointa: %p,%d", r, r.value)

	for i := 3; i <= team_num; i++ {
		depths, values, leaf_nodes := LeftLeafParentsValues(root, nil)
		next_depth, next_node := DecideNewTreeNodeLeef(depths, values, leaf_nodes)
		//fmt.Printf("next_node pointa: %p", next_node)

		_, tourID = NewTreeNode(next_node, i, next_depth, tourID)
		tourID++
		// fmt.Printf("new parent value: %d, left value: %d,right value: %d\n", new_node.value, new_node.left.value, new_node.right.value)
		PrintLevelOrder(root)
	}

	team_rank_list, err := t.Repo.ListTeamRank(ctx, cid)
	if err != nil {
		return nil, err
	}

	var tournamentTeamLists entity.TournamentTeamLists

	// CollectLeaves 関数の実行
	CollectLeaves(root, team_rank_list, &tournamentTeamLists)

	return tournamentTeamLists, nil

}
