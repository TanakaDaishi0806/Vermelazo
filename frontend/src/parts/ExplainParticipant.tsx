import { Typography, Grid, Backdrop } from "@mui/material";

import { BackDropInfo } from "../type/velmelazo";

type Props = {
  backDropInfo: BackDropInfo;
};

const ExplainParticipant: React.FC<Props> = ({ backDropInfo }) => {
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
            sx={{ mb: "40px" }}
          >
            <Typography
              sx={{ color: "#2196F3", fontSize: "20px", fontWeight: "600" }}
            >
              部内戦への参加方法
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                部内戦への参加状況の確認方法
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>
                進行中の部内戦の参加状況をご覧ください。初期状態では下の図のように不参加となっています。
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              mb: "10px",
              pb: "20px",
              borderBottom: "1px solid #888888",
            }}
          >
            <Grid container justifyContent="center" alignContent="center">
              <img
                src={"/img/fusanka2.png"}
                alt="初期状態"
                style={{ width: "80%", height: "auto" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                参加状況の変更方法
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>
                参加状況の参加・不参加をタップすると変更されます。下の図のように変更されると参加したことになります。
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
                src={"/img/sanka2.png"}
                alt="参加状態"
                style={{ width: "80%", height: "auto" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "20px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>
                ※チームが発表された後でも参加・不参加の変更ができ、チームに追加されたり削除されたりします。
              </Typography>
              <Typography>
                ※一度決まったチームは、参加・不参加を何度切り替えても同じチームに割り当てられるようになっています。
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default ExplainParticipant;
