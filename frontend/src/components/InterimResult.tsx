import { Grid } from "@mui/material";

import Header from "../components/Header";
import ResultList from "../components/ResultList";
import TeamRankList from "../components/TeamRankList";
import HomeFooter from "../components/HomeFooter";
import { InterimResultAllInfo } from "../type/velmelazo";
import Maintenance from "../parts/Maintenance";

type Props = {
  interimResultInfo: InterimResultAllInfo;
};

const InterimResult: React.FC<Props> = ({ interimResultInfo }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <ResultList
          resultPageInfo={{
            club_match_id: interimResultInfo.club_match_id,
            is_finish: interimResultInfo.is_finish,
            url: "/home/result/interim/all",
          }}
        />
      </Grid>
      <TeamRankList clubMatchID={interimResultInfo.club_match_id} />
    </Grid>
  );
};

export default InterimResult;
