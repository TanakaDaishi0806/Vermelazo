import React from "react";
import { Grid, Typography, TextField } from "@mui/material";

import { AddPKInfo } from "../type/velmelazo";
import TextItem from "../parts/TextItem";

type Props = {
  addPKInfo: AddPKInfo;
};

const AddPK: React.FC<Props> = ({ addPKInfo }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <Grid container alignItems="center" sx={{ ml: "10px" }}>
              <TextItem textItemInfo={{ itemText: "PK" }} />
            </Grid>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={4}>
            <Grid container alignItems="center" justifyContent="center">
              <TextField
                label=""
                value={addPKInfo.pk_a}
                onChange={addPKInfo.handlePKAChange}
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
                value={addPKInfo.pk_b}
                onChange={addPKInfo.handlePKBChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddPK;
