import { useLocation } from "react-router-dom";

import ListAddScoreMatchTemplate from "../templates/ListAddScoreMatchTemplate";

const ListAddScoreMatch = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;

  return (
    <ListAddScoreMatchTemplate
      MatchListInfo={{
        club_match_id: club_match_id,
      }}
    />
  );
};

export default ListAddScoreMatch;
