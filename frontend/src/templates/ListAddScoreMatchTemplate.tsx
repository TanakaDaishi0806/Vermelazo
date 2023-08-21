import React from "react";
import { Grid } from "@mui/material";

import { AddScoreMatchListInfo } from "../type/velmelazo";
import AddScoreMatchList from "../components/AddScoreMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

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
      <AdminHeader />
      <Grid
        sx={{
          mt: "40px",
          width: "320px",
        }}
      >
        <AddScoreMatchList matchListInfo={MatchListInfo} />
      </Grid>
      <AdminFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default ListAddScoreMatchTemplate;
