import React from "react";
import { Grid } from "@mui/material";

import { AddScoreMatchListInfo } from "../type/velmelazo";
import VoteMatchList from "../components/VoteMatchList";
import Header from "../components/Header";
import HomeFooter from "../components/HomeFooter";
import Maintenance from "../parts/Maintenance";

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
      <Maintenance />
      <Header headertext={{ text: "My Page" }} />
      <Grid
        sx={{
          mt: "40px",
          width: "320px",
          mb: "100px",
        }}
      >
        <VoteMatchList matchListInfo={MatchListInfo} />
      </Grid>
      <HomeFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default ListVoteMatchTemplate;
