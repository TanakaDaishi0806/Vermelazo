import { Grid, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import React from "react";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import TextItem from "../parts/TextItem";
import { GoalRankerInfo } from "../type/velmelazo";

const generateYearArray = (startYear: number) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 月は0から始まるため、1を加える
  const currentValue = currentYear * 100 + currentMonth;
  const thresholdValue = currentYear * 100 + 4;
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    if (year === currentYear) {
      if (currentValue >= thresholdValue) {
        years.push(year.toString());
      }
    } else {
      years.push(year.toString());
    }
  }
  return years;
};

const GoalRankers = () => {
  const years = generateYearArray(2023);
  const [year, setYear] = React.useState(years[0]);
  const [goalRankerList, setGoalRankerList] = React.useState<GoalRankerInfo[]>(
    []
  );
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [rankIndex, setRankIndex] = React.useState<number[]>([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/home/rankers/goalnum`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        setGoalRankerList(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  React.useEffect(() => {
    if (goalRankerList.length !== 0) {
      const rankMap = new Map<number, number>();
      let currentRank = 1;
      goalRankerList.forEach((item) => {
        if (!rankMap.has(item.goal_num)) {
          rankMap.set(item.goal_num, currentRank);
        }
        currentRank++;
      });
      const rankList = goalRankerList.map((item) => {
        return rankMap.get(item.goal_num) as number;
      });
      setRankIndex(rankList);
    }
  }, [goalRankerList]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mt: "50px", mb: "40px" }}>
        <Grid container alignItems="flex-end" justifyContent="center">
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            得点ランキング
          </Typography>
        </Grid>
      </Grid>
      {goalRankerList.length === 0 && (
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mb: "100px", mt: "10px" }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              color: "#888888",
              fontSize: "18px",
            }}
          >
            no data
          </Typography>
        </Grid>
      )}
      {goalRankerList.length !== 0 && rankIndex.length !== 0 && (
        <Grid
          container
          sx={{
            bgcolor: "#dddddd",
            mt: "10px",
            mb: "100px",
          }}
        >
          {goalRankerList.map((value, index) => (
            <Grid container sx={{}}>
              <Grid
                item
                xs={2.0}
                sx={{
                  borderRight: "1px solid #888888",
                  borderLeft: "1px solid #888888",
                  borderBottom: "1px solid #888888",
                  borderTop: "1px solid #888888",
                  bgcolor: "#eeeeee",
                  py: "10px",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  style={{ height: "100%" }} // これでコンテナ全体が中央揃えになるように高さを設定
                >
                  <Grid item>
                    <Grid
                      container
                      alignItems="flex-end"
                      justifyContent="center"
                    >
                      <Typography sx={{ fontSize: "25px" }}>
                        {rankIndex[index]}
                      </Typography>
                      <Typography sx={{}}> 位</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={8.0}
                sx={{
                  borderBottom: "1px solid #888888",
                  borderTop: "1px solid #888888",
                  bgcolor: "#eeeeee",
                  py: "10px",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Grid item>
                    <Typography>{value.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>（{value.furigana}）</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={2.0}
                sx={{
                  borderRight: "1px solid #888888",
                  borderBottom: "1px solid #888888",
                  borderTop: "1px solid #888888",
                  bgcolor: "#eeeeee",
                  py: "10px",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  style={{ height: "100%" }}
                >
                  <Grid item>
                    <Grid
                      container
                      alignItems="flex-end"
                      justifyContent="center"
                    >
                      <Typography sx={{ fontSize: "26px" }}>
                        {value.goal_num}{" "}
                      </Typography>
                      <Typography sx={{}}> 点</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default GoalRankers;
