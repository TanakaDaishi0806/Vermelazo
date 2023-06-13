import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ColorButton from "../parts/ColorButton";
import { ClubMatchGetData } from "../type/velmelazo";

type Props = {
  clubMatchGetData: ClubMatchGetData;
};

const ClubMatchCard: React.FC<Props> = ({ clubMatchGetData }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleSwitchRelesed = () => {
    axios
      .put(
        `http://localhost:18000/admin/clubmatchs/isreleased/${clubMatchGetData.club_match_id}`,
        { is_released: clubMatchGetData.is_released },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        clubMatchGetData.set(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:18000/admin/clubmatchs/${clubMatchGetData.club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        clubMatchGetData.set(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = () => {
    navigate("/admin/changeclubmatch", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
        preYear: clubMatchGetData.year,
        preMonth: clubMatchGetData.month,
        preDay: clubMatchGetData.day,
        preVoteYear: clubMatchGetData.vote_year,
        preVoteMonth: clubMatchGetData.vote_month,
        preVoteDay: clubMatchGetData.vote_day,
        preTitle: clubMatchGetData.title,
      },
    });
  };

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
            {clubMatchGetData.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
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

            <Grid item xs={8}>
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
            <Grid item xs={4}>
              <Typography
                sx={{
                  mx: "15px",
                  fontWeight: "600",
                  fontsize: "15px",
                  py: "5px",
                  textAlign: "center",
                }}
              >
                投票期限:
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography
                sx={{
                  fontsize: "15px",
                  py: "5px",
                }}
              >
                {clubMatchGetData.vote_year}/{clubMatchGetData.vote_month}/
                {clubMatchGetData.vote_day}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: "20px", mt: "20px" }}>
              <Grid container>
                {clubMatchGetData.is_released && (
                  <Grid item xs={4}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Grid item xs={12}>
                        <ColorButton
                          colorButton={{
                            buttonText: "非公開",
                            onClick: handleSwitchRelesed,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {!clubMatchGetData.is_released && (
                  <Grid item xs={4}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Grid item xs={12}>
                        <ColorButton
                          colorButton={{
                            buttonText: "公開",
                            onClick: handleSwitchRelesed,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Grid item xs={12}>
                      <ColorButton
                        colorButton={{
                          buttonText: "変更",
                          onClick: handleChange,
                          buttonColor: "success",
                          mb: "",
                          mt: "",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Grid item xs={12}>
                      <ColorButton
                        colorButton={{
                          buttonText: "削除",
                          onClick: handleDelete,
                          buttonColor: "warning",
                          mb: "",
                          mt: "",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ClubMatchCard;
