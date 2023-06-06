import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ClubMatchCard from "./ClubMatchCard";
import BaseButton from "../parts/BaseButton";
import { ClubMatchGetData } from "../type/velmelazo";

const ClubMatchData = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [clubMatchList, setClubMatchList] = useState<ClubMatchGetData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:18000/admin", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setClubMatchList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ height: "100vh", bgcolor: "#eeeeee", overflow: "auto" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        {clubMatchList.map((clubMatch) => (
          <Grid item xs={12} sm={4} key={clubMatch.club_match_num}>
            <ClubMatchCard clubMatchGetData={clubMatch} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <BaseButton
            baseButton={{
              buttonText: "日程を追加",
              onClick: () => {
                navigate("/admin/addclubmatch");
              },
              width: "120px",
              height: "50px",
              mt: "20px",
              mb: "50px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClubMatchData;
