import { Typography, Grid, Backdrop } from "@mui/material";

import { BackDropInfo } from "../type/velmelazo";

type Props = {
  backDropInfo: BackDropInfo;
};

const ExplainPoint: React.FC<Props> = ({ backDropInfo }) => {
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
          height: "80%",
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
            sx={{ mb: "20px" }}
          >
            <Typography
              sx={{ color: "#2196F3", fontSize: "20px", fontWeight: "600" }}
            >
              ユーザーポイントの詳細
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                ポイントの種類
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                ユーザーポイントを獲得するには3種類の方法があります。
              </Typography>
              <Typography>1．ゲームポイント　　　　　</Typography>
              <Typography>2．投票ポイント　　　　　　</Typography>
              <Typography>3．ポジションMOMポイント</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                ゲームポイントについて
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>
                ゲームポイントは、試合で勝った方に得点差分のポイントがチームメンバー全員に入ります。例えば下の図の場合は、Aチームに2点、Bチームに0点がそれぞれのメンバーに与えられます。
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mb: "10px", borderBottom: "1px solid #888888", pb: "20px" }}
          >
            <Grid container justifyContent="center" alignContent="center">
              <img
                src={"/img/matchpoint.png"}
                alt="ゲームポイント"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                投票ポイントについて
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
                投票数×1点分の点数が入ります。例えば、部内戦通して8回投票された場合は8点が加算されます。
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                ポジションMOMポイントについて
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "20px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>
                各部内戦においてポジションごと（OF,DF,GK）に1人ずつ管理者がMOMを選出します。そのMOMに選ばれたユーザーには10点が加算されます。
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default ExplainPoint;
