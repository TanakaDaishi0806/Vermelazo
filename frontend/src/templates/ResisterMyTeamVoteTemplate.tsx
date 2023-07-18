import { Grid } from "@mui/material";

import Header from "../components/Header";
import MyTeamVote from "../components/MyTeamVote";
import { MyVoteInfo } from "../type/velmelazo";

type Props = {
  myVoteInfo: MyVoteInfo;
};

const ResisterMyTeamVoteTemplate: React.FC<Props> = ({ myVoteInfo }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Header headertext={{ text: "Home Page" }} />
      <MyTeamVote
        myTeamVoteInfo={{
          text: "MyTeam（3人まで投票可能）",
          getUrlMyTeam: `http://localhost:18000/home/team/specify/list/${myVoteInfo.team_id}`,
          postUrl: `http://localhost:18000/home/vote/myteam/add`,
          toUrl: "/home/match/vote",
          club_match_id: myVoteInfo.club_match_id,
          user_id: myVoteInfo.user_id,
          match_id: myVoteInfo.match_id,
        }}
      />
    </Grid>
  );
};

export default ResisterMyTeamVoteTemplate;
