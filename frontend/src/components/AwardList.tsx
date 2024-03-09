import { Grid, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import React from "react";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import TextItem from "../parts/TextItem";
import { AwardInfo } from "../type/velmelazo";

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

const AwardList = () => {
  const years = generateYearArray(2023);
  const [year, setYear] = React.useState(years[0]);
  const [award, setAward] = React.useState<AwardInfo[]>([]);
  const [selectYearAward, setSelectYearAward] = React.useState<AwardInfo[]>([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/home/award`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        setAward(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  React.useEffect(() => {
    if (award !== null) {
      const newSelectYearAward = award.filter(
        (value) =>
          (new Date(value.datetime).getFullYear() === parseInt(year) &&
            new Date(value.datetime).getMonth() + 1 >= 4) ||
          (new Date(value.datetime).getFullYear() === parseInt(year) + 1 &&
            new Date(value.datetime).getMonth() + 1 < 4)
      );
      console.log(newSelectYearAward);
      setSelectYearAward(newSelectYearAward);
    }
    console.log(selectYearAward);
  }, [award, year]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mt: "50px", mb: "40px" }}>
        <Grid container alignItems="flex-end" justifyContent="center">
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Award（{year}年度）
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems="flex-end"
        justifyContent="center"
      >
        <FormControl sx={{ width: "120px" }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            year
          </InputLabel>
          <NativeSelect
            value={year}
            onChange={handleYearChange}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
          >
            {years.map((value, index) => (
              <option key={value} value={value}>
                {value}年度
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
      {selectYearAward.length === 0 && (
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mb: "100px", mt: "30px" }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              color: "#888888",
              fontSize: "18px",
            }}
          >
            検索結果：なし
          </Typography>
        </Grid>
      )}
      {selectYearAward.length !== 0 && (
        <Grid
          container
          sx={{
            bgcolor: "#dddddd",
            pt: "20px",
            mx: "5%",
            mt: "50px",
            mb: "100px",
          }}
        >
          {selectYearAward.map((value, index) => (
            <Grid container sx={{ mb: "20px" }}>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <Grid container justifyContent="left" alignItems="center">
                  <TextItem textItemInfo={{ itemText: value.award_name }} />
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid
                item
                xs={9}
                container
                justifyContent="left"
                alignItems="center"
                sx={{ mt: "10px" }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "black",
                    fontSize: "23px",
                  }}
                >
                  <WorkspacePremiumIcon
                    sx={{ marginRight: "2px", color: "#2196F3" }}
                  />
                  {value.user_name}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default AwardList;
