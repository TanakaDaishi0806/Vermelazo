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
    <Grid container sx={{ mb: "80px" }}>
      <Header headertext={{ text: "Home Page" }} />
      <Grid item xs={12} sx={{ mt: "50px", mb: "40px" }}>
        <Grid container alignItems="flex-end" justifyContent="center">
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            My Rank
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ bgcolor: "#eeeeee", pt: "10px", mx: "5%" }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Grid container justifyContent="left" alignItems="flex-end">
            <TextItem textItemInfo={{ itemText: "全体" }} />
          </Grid>
        </Grid>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={4.5} sx={{ mb: "10px" }}>
          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item xs={8}>
              {myRankData.rank_all === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {myRankData.rank_all !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {myRankData.rank_all}　
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#888888",
                  fontSize: "18px",
                }}
              >
                /{myRankData.total_all}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Grid container justifyContent="left" alignItems="flex-end">
            <TextItem textItemInfo={{ itemText: "ポジション" }} />
          </Grid>
        </Grid>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={4.5} sx={{ mb: "10px" }}>
          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item xs={8}>
              {myRankData.rank_position === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {myRankData.rank_position !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {myRankData.rank_position}　
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#888888",
                  fontSize: "18px",
                }}
              >
                /{myRankData.total_position}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Grid container justifyContent="left" alignItems="flex-end">
            <TextItem textItemInfo={{ itemText: "経験者" }} />
          </Grid>
        </Grid>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={4.5} sx={{ mb: "10px" }}>
          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item xs={8}>
              {myRankData.rank_experience === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {myRankData.rank_experience !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {myRankData.rank_experience}　
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#888888",
                  fontSize: "18px",
                }}
              >
                /{myRankData.total_experience}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Grid container justifyContent="left" alignItems="flex-end">
            <TextItem textItemInfo={{ itemText: "得点ランク" }} />
          </Grid>
        </Grid>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={4.5} sx={{ mb: "10px" }}>
          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item xs={8}>
              {myRankData.rank_goal === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {myRankData.rank_goal !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {myRankData.rank_goal}　
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#888888",
                  fontSize: "18px",
                }}
              >
                /{myRankData.total_goal}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Grid container justifyContent="left" alignItems="flex-end">
            <TextItem textItemInfo={{ itemText: "得点数" }} />
          </Grid>
        </Grid>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={4.5} sx={{ mb: "10px" }}>
          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item xs={8}>
              {myRankData.goal_num === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {myRankData.goal_num !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {myRankData.goal_num}　
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#888888",
                  fontSize: "18px",
                }}
              >
                点
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <HomeFooter footerValue={{ vnum: 2 }} />
    </Grid>
  );
};

export default MyRankTemplate;
