import { useLocation } from "react-router-dom";

import ResisterMatchVoteTemplate from "../templates/ResisterMatchVoteTemplate";

const ResisterMatchVote = () => {
  const locate = useLocation();
  const { state } = locate;
  const {
    club_match_id,
    team_id_a,
    team_id_b,
    team_name_a,
    team_name_b,
    match_id,
    user_id,
  } = state;
  return (
    <ResisterMatchVoteTemplate
      resisterMatchVoteInfo={{
        club_match_id: club_match_id,
        team_id_a: team_id_a,
        team_id_b: team_id_b,
        team_name_a: team_name_a,
        team_name_b: team_name_b,
        match_id: match_id,
        user_id: user_id,
      }}
    />
  );
};

export default ResisterMatchVote;
