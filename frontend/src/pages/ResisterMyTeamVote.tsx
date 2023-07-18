import { useLocation } from "react-router-dom";

import ResisterMyTeamVoteTemplate from "../templates/ResisterMyTeamVoteTemplate";

const ResisterMyTeamVote = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, team_id, match_id, user_id } = state;
  return (
    <ResisterMyTeamVoteTemplate
      myVoteInfo={{
        club_match_id: club_match_id,
        team_id: team_id,
        match_id: match_id,
        user_id: user_id,
      }}
    />
  );
};

export default ResisterMyTeamVote;
