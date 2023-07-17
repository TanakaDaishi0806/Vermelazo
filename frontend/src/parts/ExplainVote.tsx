import { Typography, Grid, Backdrop } from "@mui/material";

import { BackDropInfo } from "../type/velmelazo";

type Props = {
  backDropInfo: BackDropInfo;
};

const ExplainVote: React.FC<Props> = ({ backDropInfo }) => {
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
              試合の投票について
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                投票の種類について
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>下の図のように投票は2種類あります。</Typography>
              <Typography>
                1．自チームの試合の際は、「投票（MYTEAM）」と表示される。
              </Typography>
              <Typography>
                2．他チームの試合の際は、「投票（Match）」と表示される。
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
                src={"/img/votekind.png"}
                alt="投票の種類"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                投票（MYTEAM）について
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
                自チームが出る試合の中で、良かったと思う自チームのメンバー最大3人に投票することができる。
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="left" alignContent="center">
              <Typography>
                <span style={{ color: "#2196F3" }}>Q</span>
                投票（Match）について
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: "20px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>
                自チームが出てない試合の中で、良かったと思うメンバー最大3人に投票することができる。
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default ExplainVote;
