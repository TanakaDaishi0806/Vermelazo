import React from "react";
import { Grid, Typography, TextField } from "@mui/material";

import { AddScoreInfo } from "../type/velmelazo";
import TextItem from "../parts/TextItem";

type Props = {
  addScoreInfo: AddScoreInfo;
};

const AddScore: React.FC<Props> = ({ addScoreInfo }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} sx={{ mt: "50px", mb: "30px" }}>
        <Typography variant="h6" sx={{ fontSize: "25px" }}>
          {addScoreInfo.team_name_a} vs{"  "}
          {addScoreInfo.team_name_b}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <Grid container alignItems="center" sx={{ ml: "10px" }}>
              <TextItem textItemInfo={{ itemText: "得点" }} />
            </Grid>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={4}>
            <Grid container alignItems="center" justifyContent="center">
              <TextField
                label=""
                value={addScoreInfo.score_a}
                onChange={addScoreInfo.handleScoreAChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
                -
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container alignItems="center" justifyContent="center">
              <TextField
                label=""
                value={addScoreInfo.score_b}
                onChange={addScoreInfo.handleScoreBChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddScore;
