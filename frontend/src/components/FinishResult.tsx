import { Grid } from "@mui/material";

import Header from "../components/Header";
import ResultList from "../components/ResultList";
import TeamRankList from "../components/TeamRankList";
import HomeFooter from "../components/HomeFooter";
import { FinishResultAllInfo } from "../type/velmelazo";
import Maintenance from "../parts/Maintenance";

type Props = {
  finishResultInfo: FinishResultAllInfo;
};

const FinishResult: React.FC<Props> = ({ finishResultInfo }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <ResultList
          resultPageInfo={{
            club_match_id: finishResultInfo.club_match_id,
            is_finish: finishResultInfo.is_finish,
            url: "/home/result/finish/all",
          }}
        />
      </Grid>
      <TeamRankList clubMatchID={finishResultInfo.club_match_id} />
    </Grid>
  );
};

export default FinishResult;
