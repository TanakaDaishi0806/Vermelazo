import React from "react";
import { Grid } from "@mui/material";

import { AddScoreMatchListInfo } from "../type/velmelazo";
import AddScoreMatchList from "../components/AddScoreMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";

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
      <Maintenance />
      <AdminHeader />
      <Grid
        sx={{
          mt: "40px",
          width: "320px",
          mb: "60px",
        }}
      >
        <AddScoreMatchList matchListInfo={MatchListInfo} />
      </Grid>
      <AdminFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default ListAddScoreMatchTemplate;
