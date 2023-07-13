import React from "react";
import { Grid } from "@mui/material";

import { AddScoreMatchListInfo } from "../type/velmelazo";
import VoteMatchList from "../components/VoteMatchList";
import Header from "../components/Header";

type Props = {
  MatchListInfo: AddScoreMatchListInfo;
};

const ListVoteMatchTemplate: React.FC<Props> = ({ MatchListInfo }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Header headertext={{ text: "Home Page" }} />
      <Grid
        sx={{
          mt: "40px",
          width: "320px",
        }}
      >
        <VoteMatchList matchListInfo={MatchListInfo} />
      </Grid>
    </Grid>
  );
};

export default ListVoteMatchTemplate;
