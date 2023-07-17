import { Typography, Grid, Backdrop } from "@mui/material";

import { BackDropInfo } from "../type/velmelazo";

type Props = {
  backDropInfo: BackDropInfo;
};

const ExplainMom: React.FC<Props> = ({ backDropInfo }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
      open={backDropInfo.open}
      onClick={backDropInfo.handleClose}
    >
      <Grid
        container
        sx={{
          bgcolor: "white",
          width: "80%",
          height: "60%",
          p: "20px",
          color: "black",
          overflow: "auto",
          display: "flex",
        }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            sx={{ pb: "20px" }}
          >
            <Typography
              sx={{ color: "#2196F3", fontSize: "20px", fontWeight: "600" }}
            >
              MOMの詳細
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                MOMの種類について
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mb: "10px", borderBottom: "1px solid #888888", pb: "20px" }}
          >
            <Grid container justifyContent="left" alignContent="center">
              <Typography>MOMは2種類あります。</Typography>
              <Typography>1．各試合のMOM</Typography>
              <Typography>2．ポジションMOM</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                各試合のMOMについて
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mb: "10px", borderBottom: "1px solid #888888", pb: "20px" }}
          >
            <Grid container justifyContent="center" alignContent="center">
              <Typography>
                各試合ごとに投票（MYTEAM）と投票（Match）の投票数の合計が一番多い人がMOMに選ばれます。投票数が同率の場合は、複数人が選ばれることもあります。
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                ポジションMOMについて
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "20px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>
                各部内戦においてポジションごと（OF,DF,GK）に1人ずつ管理者がMOMを選出します。
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default ExplainMom;
