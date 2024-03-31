import { Typography, Grid, Backdrop } from "@mui/material";
//testfalse
const Maintenance = () => {
  console.log(process.env.REACT_APP_MAINTENANCE_FLAG);
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
      open={process.env.REACT_APP_MAINTENANCE_FLAG === "true"}
    >
      <Grid
        container
        sx={{
          bgcolor: "white",
          width: "85%",
          height: "150px",
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
              メンテナンス中
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <Grid container justifyContent="center" alignContent="center">
              <Typography>メンテナンス終了までお待ちください</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default Maintenance;
