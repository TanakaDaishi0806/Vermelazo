import React from "react";
import { ClubMatchGetData } from "../type/velmelazo";
import { Box, Grid, Typography } from "@mui/material";

type Props = {
  clubMatchGetData: ClubMatchGetData;
};

const ClubMatchCard: React.FC<Props> = ({ clubMatchGetData }) => {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        mt: "40px",
        width: "350px",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="left"
        justifyContent="left"
        direction="column"
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              borderBottom: "2px solid #eeeeee",
              px: "20px",
              fontWeight: "700",
            }}
          >
            第{clubMatchGetData.club_match_num}回部内戦
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <Typography
                sx={{
                  bgcolor: "#eeeeee",
                  mx: "15px",
                  color: "#888888",
                  fontWeight: "600",
                  fontsize: "15px",
                  py: "5px",
                  textAlign: "center",
                }}
              >
                日程
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography
                sx={{
                  fontsize: "15px",
                  py: "5px",
                }}
              >
                {clubMatchGetData.year}/{clubMatchGetData.month}/
                {clubMatchGetData.day}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ClubMatchCard;
