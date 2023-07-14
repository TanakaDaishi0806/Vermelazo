import { Grid } from "@mui/material";

import Header from "../components/Header";
import ResultList from "../components/ResultList";
import TeamRankList from "../components/TeamRankList";
import HomeFooter from "../components/HomeFooter";

type Props = {
  clubMatchID: number;
};

const InterimResultTemplate: React.FC<Props> = ({ clubMatchID }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Header headertext={{ text: "Home Page" }} />
      <Grid item xs={12}>
        <ResultList
          resultPageInfo={{ club_match_id: clubMatchID, is_finish: false }}
        />
      </Grid>
      <TeamRankList clubMatchID={clubMatchID} />
      <HomeFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default InterimResultTemplate;
