import { Grid, Typography } from "@mui/material";

import { MyRankData } from "../type/velmelazo";
import Header from "../components/Header";
import TextItem from "../parts/TextItem";
import HomeFooter from "../components/HomeFooter";

type Props = {
  myRankData: MyRankData;
};

const MyRankTemplate: React.FC<Props> = ({ myRankData }) => {
  return (
    <Grid container>
      <Header headertext={{ text: "Home Page" }} />
      <Grid item xs={12} sx={{ mt: "100px", mb: "40px" }}>
        <Grid container alignItems="flex-end" justifyContent="center">
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            My Rank
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ bgcolor: "#eeeeee", pt: "10px", mx: "5%" }}>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={4.5}>
          <Grid container justifyContent="left" alignItems="flex-end">
            <TextItem textItemInfo={{ itemText: "全体" }} />
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ borderBottom: "3px solid #888888", mb: "10px" }}
        >
          <Grid container justifyContent="right" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                pr: "10%",
                fontWeight: "600",
              }}
            >
              {myRankData.rank_all}　
              <span style={{ color: "#888888", fontSize: "18px" }}>
                /{myRankData.total_all}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={4.5}>
          <Grid container justifyContent="left" alignItems="center">
            <TextItem textItemInfo={{ itemText: "ポジション" }} />
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ borderBottom: "3px solid #888888", mb: "10px" }}
        >
          <Grid container justifyContent="right" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                pr: "10%",
                fontWeight: "600",
              }}
            >
              {myRankData.rank_position}　
              <span style={{ color: "#888888", fontSize: "18px" }}>
                /{myRankData.total_position}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={4.5}>
          <Grid container justifyContent="left" alignItems="center">
            <TextItem textItemInfo={{ itemText: "経験者" }} />
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ borderBottom: "3px solid #888888", mb: "10px" }}
        >
          <Grid container justifyContent="right" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                pr: "10%",
                fontWeight: "600",
              }}
            >
              {myRankData.rank_experience}　
              <span style={{ color: "#888888", fontSize: "18px" }}>
                /{myRankData.total_experience}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={4.5}>
          <Grid container justifyContent="left" alignItems="center">
            <TextItem textItemInfo={{ itemText: "得点ランク" }} />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid
            container
            justifyContent="right"
            alignItems="center"
            sx={{ borderBottom: "3px solid #888888", mb: "10px" }}
          >
            <Typography
              variant="h4"
              sx={{
                pr: "10%",
                fontWeight: "600",
              }}
            >
              {myRankData.rank_goal}　
              <span style={{ color: "#888888", fontSize: "18px" }}>
                /{myRankData.total_goal}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={4.5}>
          <Grid container justifyContent="left" alignItems="center">
            <TextItem textItemInfo={{ itemText: "得点数" }} />
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ borderBottom: "3px solid #888888", mb: "10px" }}
        >
          <Grid container justifyContent="right" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "600",
                pr: "10%",
              }}
            >
              {myRankData.goal_num}　
              <span style={{ color: "#888888", fontSize: "18px" }}> 点</span>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <HomeFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default MyRankTemplate;
