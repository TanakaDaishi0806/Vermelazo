import { Grid } from "@mui/material";

import Header from "../components/Header";
import MatchVote from "../components/MatchVote";
import { ResisterMatchVoteInfo } from "../type/velmelazo";
import Maintenance from "../parts/Maintenance";

type Props = {
  resisterMatchVoteInfo: ResisterMatchVoteInfo;
};

const ResisterMyTeamVoteTemplate: React.FC<Props> = ({
  resisterMatchVoteInfo,
}) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Maintenance />
      <Header headertext={{ text: "Home Page" }} />
      <MatchVote
        matchVoteInfo={{
          text: "マッチMOM（3人まで投票可能）",
          getUrlTeamA: `${process.env.REACT_APP_API_URL}/home/team/specify/list/${resisterMatchVoteInfo.team_id_a}`,
          getUrlTeamB: `${process.env.REACT_APP_API_URL}/home/team/specify/list/${resisterMatchVoteInfo.team_id_b}`,
          team_name_a: resisterMatchVoteInfo.team_name_a,
          team_name_b: resisterMatchVoteInfo.team_name_b,
          postUrl: `${process.env.REACT_APP_API_URL}/home/vote/match/add`,
          toUrl: "/home/match/vote",
          club_match_id: resisterMatchVoteInfo.club_match_id,
          user_id: resisterMatchVoteInfo.user_id,
          match_id: resisterMatchVoteInfo.match_id,
        }}
      />
    </Grid>
  );
};

export default ResisterMyTeamVoteTemplate;
