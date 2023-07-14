import { Grid } from "@mui/material";

import Header from "../components/Header";
import ResultList from "../components/ResultList";
import TeamRankList from "../components/TeamRankList";

type Props = {
  clubMatchID: number;
};

const FinishResultTemplate: React.FC<Props> = ({ clubMatchID }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Header headertext={{ text: "Home Page" }} />
      <Grid item xs={12}>
        <ResultList
          resultPageInfo={{ club_match_id: clubMatchID, is_finish: true }}
        />
      </Grid>
      <TeamRankList clubMatchID={clubMatchID} />
    </Grid>
  );
};

export default FinishResultTemplate;
