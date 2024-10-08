import React from "react";
import { Box, Grid, Typography, Backdrop } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ColorButton from "../parts/ColorButton";
import { ClubMatchGetData } from "../type/velmelazo";
import { PositionMom } from "../type/velmelazo";
import { TopScorerData } from "../type/velmelazo";

type Props = {
  clubMatchGetData: ClubMatchGetData;
};

const FinishClubMatchCard: React.FC<Props> = ({ clubMatchGetData }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [positionMom, setPositionMom] = React.useState<PositionMom[]>([]);
  const [openFinish, setOpenFinish] = React.useState(false);
  const [topScorer, setTopScorer] = React.useState<TopScorerData[]>([]);
  const momnamelist = ["MOM-GK", "MOM-DF", "MOM-OF"];

  const handleCloseFinish = () => {
    setOpenFinish(false);
  };
  const handleOpenFinish = () => {
    setOpenFinish(true);
  };

  const handleTeamList = () => {
    navigate("/home/teamlist", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
        vnum: 1,
      },
    });
  };
  const handleAdminTeamList = () => {
    navigate("/admin/teamlist", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
        vnum: 1,
      },
    });
  };

  const handleSwitchFinish = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/admin/clubmatchs/isfinish/${clubMatchGetData.club_match_id}`,
        {},
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
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  };

  const handleFinishResultType0Page = () => {
    navigate("/home/result/finish", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
      },
    });
  };

  const handleFinishResultType1Page = () => {
    navigate("/home/result/finish/all", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
        vnum: 1,
        is_finish: clubMatchGetData.is_finish,
        value: 0,
      },
    });
  };

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/mom/position/list/${clubMatchGetData.club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPositionMom(response.data);
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/home/topscorer/list/${clubMatchGetData.club_match_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setTopScorer(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
              navigate("/");
            }
          });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, [accessToken, clubMatchGetData.club_match_id, navigate]);

  return (
    <div>
      {clubMatchGetData.is_finish &&
        (clubMatchGetData.is_released || clubMatchGetData.isAdmin) && (
          <Box
            sx={{
              bgcolor: "#ffffff",
              mt: "40px",
              pb: "20px",
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
              <Grid
                item
                xs={12}
                sx={{
                  borderBottom: "2px solid #eeeeee",
                }}
              >
                <Grid container>
                  <Grid item xs={10}>
                    <Typography
                      variant="h5"
                      sx={{
                        px: "20px",
                        fontWeight: "700",
                      }}
                    >
                      {clubMatchGetData.title}
                    </Typography>
                  </Grid>
                  {clubMatchGetData.point_times === 1 && (
                    <Grid
                      item
                      xs={1}
                      sx={{
                        fontWeight: "700",
                        color: "#2196F3",
                      }}
                    ></Grid>
                  )}
                  {clubMatchGetData.point_times !== 1 && (
                    <Grid item xs={1}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "700",
                          color: "#2196F3",
                        }}
                      >
                        ×{clubMatchGetData.point_times}
                      </Typography>
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={1}
                    sx={{
                      fontWeight: "700",
                      color: "#2196F3",
                    }}
                  ></Grid>
                </Grid>
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
                      参加人数:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      sx={{
                        fontsize: "15px",
                        py: "5px",
                      }}
                    >
                      {clubMatchGetData.participant_num}
                    </Typography>
                  </Grid>

                  {!clubMatchGetData.isAdmin && (
                    <Grid container>
                      {positionMom.length !== 0 &&
                        positionMom.map((mom, index) => (
                          <Grid container>
                            <Grid item xs={4}>
                              <Typography
                                sx={{
                                  mx: "15px",
                                  fontWeight: "600",
                                  fontsize: "10px",
                                  py: "5px",
                                  textAlign: "right",
                                }}
                              >
                                {momnamelist[index]}:
                              </Typography>
                            </Grid>

                            <Grid item xs={8}>
                              <Typography
                                sx={{
                                  mx: "15px",
                                  fontWeight: "600",
                                  fontsize: "15px",
                                  py: "5px",
                                }}
                              >
                                {mom.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                  )}

                  {!clubMatchGetData.isAdmin && (
                    <Grid container>
                      {topScorer.length !== 0 &&
                        topScorer.map((member, index) => (
                          <Grid container>
                            {index === 0 && (
                              <Grid item xs={4}>
                                <Typography
                                  sx={{
                                    mx: "",
                                    fontWeight: "600",
                                    fontsize: "15px",
                                    py: "5px",
                                    textAlign: "center",
                                  }}
                                >
                                  　得点王：
                                </Typography>
                              </Grid>
                            )}
                            {index !== 0 && <Grid item xs={4}></Grid>}

                            <Grid item xs={8}>
                              <Typography
                                sx={{
                                  mx: "15px",
                                  fontWeight: "600",
                                  fontsize: "15px",
                                  py: "5px",
                                }}
                              >
                                {member.name}
                                {"("}
                                {member.goal_num}
                                {")"}
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                  )}
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
                      チーム:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {!clubMatchGetData.is_create_team && (
                      <Typography
                        sx={{
                          fontsize: "15px",
                          py: "5px",
                        }}
                      >
                        まだ作成されていません
                      </Typography>
                    )}
                    {clubMatchGetData.is_create_team &&
                      !clubMatchGetData.isAdmin && (
                        <ColorButton
                          colorButton={{
                            buttonText: "閲覧",
                            onClick: handleTeamList,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                    {clubMatchGetData.is_create_team &&
                      clubMatchGetData.isAdmin && (
                        <ColorButton
                          colorButton={{
                            buttonText: "閲覧",
                            onClick: handleAdminTeamList,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                  </Grid>

                  {!clubMatchGetData.isAdmin && (
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
                        試合結果:
                      </Typography>
                    </Grid>
                  )}
                  {!clubMatchGetData.isAdmin &&
                    (clubMatchGetData.club_match_type === 0 ? (
                      <Grid item xs={8}>
                        <ColorButton
                          colorButton={{
                            buttonText: "閲覧",
                            onClick: handleFinishResultType0Page,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={8}>
                        <ColorButton
                          colorButton={{
                            buttonText: "閲覧",
                            onClick: handleFinishResultType1Page,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      </Grid>
                    ))}
                  {clubMatchGetData.isAdmin && (
                    <Grid item xs={8}>
                      {!clubMatchGetData.is_finish && (
                        <div>
                          <ColorButton
                            colorButton={{
                              buttonText: "未完了",
                              onClick: handleOpenFinish,
                              buttonColor: "info",
                              mb: "",
                              mt: "",
                            }}
                          />
                          <Backdrop
                            sx={{
                              color: "#fff",
                              zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={openFinish}
                            onClick={handleCloseFinish}
                          >
                            <Grid
                              container
                              sx={{
                                bgcolor: "white",
                                width: "80%",
                                p: "10px",
                              }}
                            >
                              <Grid item xs={12}>
                                <Typography sx={{ color: "black" }}>
                                  実施状況を完了にすると変更ができなくなりますがよろしいですか？
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Grid
                                  container
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <ColorButton
                                    colorButton={{
                                      buttonText: "キャンセル",
                                      onClick: handleCloseFinish,
                                      buttonColor: "info",
                                      mb: "10px",
                                      mt: "20px",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xs={6}>
                                <Grid
                                  container
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <ColorButton
                                    colorButton={{
                                      buttonText: "完了",
                                      onClick: handleSwitchFinish,
                                      buttonColor: "info",
                                      mb: "10px",
                                      mt: "20px",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Backdrop>
                        </div>
                      )}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
    </div>
  );
};
export default FinishClubMatchCard;
