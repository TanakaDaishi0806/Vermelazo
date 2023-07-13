import React from "react";
import { Grid } from "@mui/material";

import { ChangeMatchListInfo } from "../type/velmelazo";
import MatchList from "../components/MatchList";
import Header from "../components/Header";
import BaseButton from "../parts/BaseButton";

type Props = {
  changeMatchListInfo: ChangeMatchListInfo;
};

const ListCreateMatchTemplate: React.FC<Props> = ({ changeMatchListInfo }) => {
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
        <MatchList matchListInfo={changeMatchListInfo.matchListInfo} />
        <Grid item xs={12} sx={{ mt: "50px", mb: "50px" }}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container alignItems="center" justifyContent="center">
                <BaseButton
                  baseButton={{
                    buttonText: "変更",
                    onClick: changeMatchListInfo.handleCreateMatchList,
                    width: "120px",
                    height: "50px",
                    mt: "",
                    mb: "",
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container alignItems="center" justifyContent="center">
                <BaseButton
                  baseButton={{
                    buttonText: "決定",
                    onClick: changeMatchListInfo.handleHome,
                    width: "120px",
                    height: "50px",
                    mt: "",
                    mb: "",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListCreateMatchTemplate;
