import { Grid } from "@mui/material";

import Header from "../components/Header";
import ResultList from "../components/ResultList";
import TeamRankList from "../components/TeamRankList";
import HomeFooter from "../components/HomeFooter";
import Maintenance from "../parts/Maintenance";

type Props = {
  clubMatchID: number;
};

const FinishResultTemplate: React.FC<Props> = ({ clubMatchID }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Maintenance />
      <Header headertext={{ text: "Home Page" }} />
      <Grid item xs={12}>
        <ResultList
          resultPageInfo={{ club_match_id: clubMatchID, is_finish: true }}
        />
      </Grid>
      <TeamRankList clubMatchID={clubMatchID} />
      <HomeFooter footerValue={{ vnum: 1 }} />
    </Grid>
  );
};

export default FinishResultTemplate;
