import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ClubMatchCard from "./ClubMatchCard";
import BaseButton from "../parts/BaseButton";
import { ClubMatchGetData, GetURL } from "../type/velmelazo";

type Props = {
  getUrl: GetURL;
};

const ClubMatchData: React.FC<Props> = ({ getUrl }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [clubMatchList, setClubMatchList] = useState<ClubMatchGetData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(getUrl.url, {
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
          <Grid item xs={12} sm={4} key={clubMatch.club_match_id}>
            <ClubMatchCard
              clubMatchGetData={{
                club_match_id: clubMatch.club_match_id,
                year: clubMatch.year,
                month: clubMatch.month,
                day: clubMatch.day,
                vote_year: clubMatch.vote_year,
                vote_month: clubMatch.vote_month,
                vote_day: clubMatch.vote_day,
                title: clubMatch.title,
                is_released: clubMatch.is_released,
                isAdmin: getUrl.isAdmin,
                is_participant: clubMatch.is_participant,
                set: setClubMatchList,
              }}
            />
          </Grid>
        ))}
        {getUrl.isAdmin && (
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
        )}
      </Grid>
    </Box>
  );
};

export default ClubMatchData;
