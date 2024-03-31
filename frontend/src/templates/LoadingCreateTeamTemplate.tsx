import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Maintenance from "../parts/Maintenance";

const LoadingCreateTeamTemplate = () => {
  return (
    <Grid
      container
      justifyContent="center" // 横方向の中央寄せ
      alignItems="center" // 縦方向の中央寄せ
      style={{ height: "100vh" }} // 画面全体の高さいっぱいに設定
    >
      <Maintenance />
      <CircularProgress />
    </Grid>
  );
};

export default LoadingCreateTeamTemplate;
