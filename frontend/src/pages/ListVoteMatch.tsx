import { useLocation } from "react-router-dom";

import ListVoteMatchTemplate from "../templates/ListVoteMatchTemplate";

const ListVoteMatch = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;

  return (
    <ListVoteMatchTemplate
      MatchListInfo={{
        club_match_id: club_match_id,
      }}
    />
  );
};

export default ListVoteMatch;
