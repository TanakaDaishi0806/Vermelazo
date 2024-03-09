import { Grid, Typography, AppBar } from "@mui/material";

import { YourRankInfo } from "../type/velmelazo";
import TextItem from "../parts/TextItem";

type Props = {
  yourRankInfo: YourRankInfo;
};

const YourRankList: React.FC<Props> = ({ yourRankInfo }) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ mt: "50px", mb: "40px" }}>
        <Grid container alignItems="flex-end" justifyContent="center">
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            Your Rank
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
              {yourRankInfo.rank_all === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {yourRankInfo.rank_all !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {yourRankInfo.rank_all}　
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
                /{yourRankInfo.total_all}
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
              {yourRankInfo.rank_position === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {yourRankInfo.rank_position !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {yourRankInfo.rank_position}　
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
                /{yourRankInfo.total_position}
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
              {yourRankInfo.rank_experience === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {yourRankInfo.rank_experience !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {yourRankInfo.rank_experience}　
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
                /{yourRankInfo.total_experience}
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
              {yourRankInfo.rank_goal === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {yourRankInfo.rank_goal !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {yourRankInfo.rank_goal}　
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
                /{yourRankInfo.total_goal}
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
              {yourRankInfo.goal_num === -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  -
                </Typography>
              )}
              {yourRankInfo.goal_num !== -1 && (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {yourRankInfo.goal_num}　
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
    </Grid>
  );
};

export default YourRankList;
