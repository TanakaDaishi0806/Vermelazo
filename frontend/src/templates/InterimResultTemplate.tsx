import { Grid } from "@mui/material";

import Header from "../components/Header";
import ResultList from "../components/ResultList";
import TeamRankList from "../components/TeamRankList";
import HomeFooter from "../components/HomeFooter";
import { InterimResultInfo } from "../type/velmelazo";
import Maintenance from "../parts/Maintenance";

type Props = {
  interimResultInfo: InterimResultInfo;
};

const InterimResultTemplate: React.FC<Props> = ({ interimResultInfo }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Maintenance />
      <Header headertext={{ text: "Home Page" }} />
      <Grid item xs={12}>
        <ResultList
          resultPageInfo={{
            club_match_id: interimResultInfo.club_match_id,
            is_finish: false,
          }}
        />
      </Grid>
      <TeamRankList clubMatchID={interimResultInfo.club_match_id} />
      <HomeFooter footerValue={{ vnum: interimResultInfo.vnum }} />
    </Grid>
  );
};

export default InterimResultTemplate;
