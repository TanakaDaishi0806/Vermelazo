import { useLocation } from "react-router-dom";

import ListVoteMatchProgressTemplate from "../templates/ListVoteMatchTemplateProgress";

const ListVoteMatchProgress = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;

  return (
    <ListVoteMatchProgressTemplate
      MatchListInfo={{
        club_match_id: club_match_id,
      }}
    />
  );
};

export default ListVoteMatchProgress;
