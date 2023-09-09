import React from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { TeamRankListData } from "../type/velmelazo";
import { teamIdentifyData } from "../data/teamNameData";

type Props = {
  clubMatchID: number;
};

const TeamRankList: React.FC<Props> = ({ clubMatchID }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [rankList, setRankList] = React.useState<TeamRankListData[]>([]);
  const [rankData, setRankData] = React.useState<number[]>([]);
  const [minTeamID, setMinTeamID] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/teamrank/list/${clubMatchID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setRankList(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, [accessToken, clubMatchID, navigate]);

  React.useEffect(() => {
    if (rankList !== undefined && rankList.length !== 0) {
      let min = 1000000;
      let tmppoint = 1000000;
      let nowrank = 0;
      let tmprank = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25,
      ];
      rankList.map((rank, index) => {
        if (min > rank.team_id) {
          min = rank.team_id;
        }
        if (tmppoint > rank.point + rank.win_num + rank.goal_num) {
          tmppoint = rank.point + rank.win_num + rank.goal_num;
          nowrank = tmprank[index];
        } else if ((tmppoint = rank.point + rank.win_num + rank.goal_num)) {
          tmprank[index] = nowrank;
        }
      });
      setMinTeamID(min);
      setRankData(tmprank);
    }
  }, [rankList]);

  return (
    <Grid container sx={{ mb: "200px" }}>
      <Grid item xs={12} sx={{ mt: "100px", mb: "40px" }}>
        <Grid container alignItems="center" justifyContent="center">
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            順位
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1.3}
        sx={{
          borderRight: "1px solid #888888",
          borderBottom: "1px solid #888888",
          borderTop: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{}}>順位</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={2.9}
        sx={{
          borderRight: "1px solid #888888",
          borderBottom: "1px solid #888888",
          borderTop: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{}}>チーム名</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1.3}
        sx={{
          borderRight: "1px solid #888888",
          borderBottom: "1px solid #888888",
          borderTop: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{}}>勝点</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1.3}
        sx={{
          borderRight: "1px solid #888888",
          borderBottom: "1px solid #888888",
          borderTop: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{}}>試合</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1.3}
        sx={{
          borderRight: "1px solid #888888",
          borderBottom: "1px solid #888888",
          borderTop: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{}}>勝</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1.3}
        sx={{
          borderRight: "1px solid #888888",
          borderBottom: "1px solid #888888",
          borderTop: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{}}>引</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1.3}
        sx={{
          borderRight: "1px solid #888888",
          borderBottom: "1px solid #888888",
          borderTop: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{}}>負</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1.3}
        sx={{
          borderBottom: "1px solid #888888",
          borderTop: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{}}>得点</Typography>
        </Grid>
      </Grid>
      {rankList.map((rank, index) => (
        <Grid container key={index}>
          <Grid
            item
            xs={1.3}
            sx={{
              borderRight: "1px solid #888888",
              borderBottom: "1px solid #888888",

              py: "10px",
            }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{}}>{rankData[index]}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={2.9}
            sx={{
              borderRight: "1px solid #888888",
              borderBottom: "1px solid #888888",

              py: "10px",
            }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{ color: "#2196F3", fontWeight: "1000" }}>
                team{teamIdentifyData[rank.team_id - minTeamID]}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1.3}
            sx={{
              borderRight: "1px solid #888888",
              borderBottom: "1px solid #888888",

              py: "10px",
            }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{}}>{rank.point}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1.3}
            sx={{
              borderRight: "1px solid #888888",
              borderBottom: "1px solid #888888",

              py: "10px",
            }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{}}>{rank.match_num}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1.3}
            sx={{
              borderRight: "1px solid #888888",
              borderBottom: "1px solid #888888",

              py: "10px",
            }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{}}>{rank.win_num}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1.3}
            sx={{
              borderRight: "1px solid #888888",
              borderBottom: "1px solid #888888",

              py: "10px",
            }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{}}>{rank.draw_num}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1.3}
            sx={{
              borderRight: "1px solid #888888",
              borderBottom: "1px solid #888888",

              py: "10px",
            }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{}}>{rank.lose_num}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1.3}
            sx={{
              borderBottom: "1px solid #888888",

              py: "10px",
            }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography sx={{}}>{rank.goal_num}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamRankList;
