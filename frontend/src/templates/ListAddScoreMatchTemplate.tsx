import React from "react";
import { Grid } from "@mui/material";

import { AddScoreMatchListInfo } from "../type/velmelazo";
import AddScoreMatchList from "../components/AddScoreMatchList";
import Header from "../components/Header";

type Props = {
  MatchListInfo: AddScoreMatchListInfo;
};

const ListAddScoreMatchTemplate: React.FC<Props> = ({ MatchListInfo }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Header headertext={{ text: "Admin Page" }} />
      <Grid
        sx={{
          mt: "40px",
          width: "320px",
        }}
      >
        <AddScoreMatchList matchListInfo={MatchListInfo} />
      </Grid>
    </Grid>
  );
};

export default ListAddScoreMatchTemplate;
