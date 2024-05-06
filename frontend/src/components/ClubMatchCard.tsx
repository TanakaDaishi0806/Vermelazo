import React from "react";
import { Box, Grid, Typography, Backdrop } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import ColorButton from "../parts/ColorButton";
import { ClubMatchGetData } from "../type/velmelazo";
import ParticipantNameList from "../parts/ParticipantNameList";

type Props = {
  clubMatchGetData: ClubMatchGetData;
};

const ClubMatchCard: React.FC<Props> = ({ clubMatchGetData }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openFinish, setOpenFinish] = React.useState(false);
  const [openParticipantList, setOpenParticipantList] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState<Date>(new Date());
  const partiipantDeadlineDate = new Date(
    clubMatchGetData.year,
    clubMatchGetData.month - 1,
    clubMatchGetData.day,
    8,
    0,
    0
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1秒ごとに更新
    console.log(currentTime);
    console.log(partiipantDeadlineDate);
    console.log(
      clubMatchGetData.is_participant && currentTime < partiipantDeadlineDate
    );
    console.log(
      clubMatchGetData.is_participant && currentTime > partiipantDeadlineDate
    );

    return () => {
      clearInterval(intervalId); // コンポーネントがアンマウントされたときにクリア
    };
  }, []);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseFinish = () => {
    setOpenFinish(false);
  };
  const handleOpenFinish = () => {
    setOpenFinish(true);
  };
  const handleCloseParticipantList = () => {
    setOpenParticipantList(false);
  };
  const handleOpenParticipantList = () => {
    setOpenParticipantList(true);
  };

  const handleSwitchRelesed = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/admin/clubmatchs/isreleased/${clubMatchGetData.club_match_id}`,
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
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  };

  const handleClubMatchDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/admin/clubmatchs/${clubMatchGetData.club_match_id}`,
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

  const handleParticipantAdd = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/home`,
        { club_match_id: clubMatchGetData.club_match_id },
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

  const handleTeamMemberAdd = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/home/teammember/add`,
        {
          club_match_id: clubMatchGetData.club_match_id,
        },
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

  const handleParticipantDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/home/participant/${clubMatchGetData.club_match_id}`,
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

  const handleTeamMemberDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/home/teammember/${clubMatchGetData.club_match_id}`,
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
        prePointTimes: clubMatchGetData.point_times,
      },
    });
  };

  const handleCreateTeam = () => {
    navigate("/admin/team/create", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
        participant_num: clubMatchGetData.participant_num,
      },
    });
  };

  const handleChangeTeam = () => {
    navigate("/admin/team/change", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
        participant_num: clubMatchGetData.participant_num,
      },
    });
  };

  const handleTeamList = () => {
    navigate("/home/teamlist", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
        vnum: 0,
      },
    });
  };

  const handleCreateMatch = () => {
    navigate("/admin/match/create", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
      },
    });
  };

  const handleCreateMatchList = () => {
    navigate("/admin/match/list", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
      },
    });
  };

  const handleAddScoreMatchList = () => {
    navigate("/admin/match/score", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
      },
    });
  };

  const handleResisterOFMom = () => {
    navigate("/admin/mom/gk", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
      },
    });
  };

  const handleSwitchFinish = () => {
    navigate("/admin/clubmatch/finish/loading", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
      },
    });
  };

  const handleVoteMatchList = () => {
    navigate("/home/match/vote", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
      },
    });
  };

  const handleInterimResultPage = () => {
    navigate("/home/result/interim", {
      state: {
        club_match_id: clubMatchGetData.club_match_id,
        vnum: 0,
      },
    });
  };

  return (
    <div>
      {!clubMatchGetData.is_finish &&
        (clubMatchGetData.is_released || clubMatchGetData.isAdmin) && (
          <Box
            sx={{
              bgcolor: "#ffffff",
              mt: "40px",
              pb: "30px",
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
                <Grid container>
                  <Grid item xs={10}>
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
                  {clubMatchGetData.point_times === 1 && (
                    <Grid
                      item
                      xs={1}
                      sx={{
                        borderBottom: "2px solid #eeeeee",
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
                          borderBottom: "2px solid #eeeeee",
                          fontWeight: "700",
                          color: "#2196F3",
                        }}
                      >
                        ×{clubMatchGetData.point_times}
                      </Typography>
                    </Grid>
                  )}

                  {clubMatchGetData.isAdmin && (
                    <Grid
                      item
                      xs={1}
                      sx={{
                        borderBottom: "2px solid #eeeeee",
                      }}
                    >
                      <DeleteIcon onClick={handleOpenDelete} />

                      <Backdrop
                        sx={{
                          color: "#fff",
                          zIndex: (theme) => theme.zIndex.drawer + 2,
                        }}
                        open={openDelete}
                        onClick={handleCloseDelete}
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
                              削除するとこの部内戦のデータは復元できませんがよろしいですか？
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
                                  onClick: handleCloseDelete,
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
                                  buttonText: "削除",
                                  onClick: handleClubMatchDelete,
                                  buttonColor: "info",
                                  mb: "10px",
                                  mt: "20px",
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Backdrop>
                    </Grid>
                  )}
                  {!clubMatchGetData.isAdmin && (
                    <Grid
                      item
                      xs={1}
                      sx={{
                        borderBottom: "2px solid #eeeeee",
                      }}
                    ></Grid>
                  )}
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
                      {clubMatchGetData.vote_year}/{clubMatchGetData.vote_month}
                      /{clubMatchGetData.vote_day}
                    </Typography>
                  </Grid>

                  {clubMatchGetData.isAdmin && (
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
                        日程等:
                      </Typography>
                    </Grid>
                  )}
                  {clubMatchGetData.isAdmin && (
                    <Grid item xs={8}>
                      <ColorButton
                        colorButton={{
                          buttonText: "変更",
                          onClick: handleChange,
                          buttonColor: "info",
                          mb: "",
                          mt: "",
                        }}
                      />
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
                  {clubMatchGetData.isAdmin && (
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
                        公開状況:
                      </Typography>
                    </Grid>
                  )}
                  {clubMatchGetData.isAdmin && (
                    <Grid item xs={8}>
                      {clubMatchGetData.is_released && (
                        <ColorButton
                          colorButton={{
                            buttonText: "公開",
                            onClick: handleSwitchRelesed,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                      {!clubMatchGetData.is_released && (
                        <ColorButton
                          colorButton={{
                            buttonText: "非公開",
                            onClick: handleSwitchRelesed,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                    </Grid>
                  )}
                  {clubMatchGetData.isAdmin && (
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
                  )}
                  {clubMatchGetData.isAdmin && (
                    <Grid item xs={8}>
                      {!clubMatchGetData.is_create_team && (
                        <ColorButton
                          colorButton={{
                            buttonText: "新規チーム編成",
                            onClick: handleCreateTeam,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                      {clubMatchGetData.is_create_team && (
                        <ColorButton
                          colorButton={{
                            buttonText: "チーム編成",
                            onClick: handleChangeTeam,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                    </Grid>
                  )}

                  {clubMatchGetData.isAdmin && (
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
                        組合せ:
                      </Typography>
                    </Grid>
                  )}
                  {clubMatchGetData.isAdmin && (
                    <Grid item xs={8}>
                      {!clubMatchGetData.is_add_match && (
                        <ColorButton
                          colorButton={{
                            buttonText: "作成",
                            onClick: handleCreateMatch,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                      {clubMatchGetData.is_add_match && (
                        <ColorButton
                          colorButton={{
                            buttonText: "変更",
                            onClick: handleCreateMatchList,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                    </Grid>
                  )}

                  {clubMatchGetData.isAdmin && (
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
                  {clubMatchGetData.isAdmin && (
                    <Grid item xs={8}>
                      <ColorButton
                        colorButton={{
                          buttonText: "登録画面",
                          onClick: handleAddScoreMatchList,
                          buttonColor: "info",
                          mb: "",
                          mt: "",
                        }}
                      />
                    </Grid>
                  )}
                  {clubMatchGetData.isAdmin && (
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
                        MOM:
                      </Typography>
                    </Grid>
                  )}
                  {clubMatchGetData.isAdmin && (
                    <Grid item xs={8}>
                      <ColorButton
                        colorButton={{
                          buttonText: "登録画面",
                          onClick: handleResisterOFMom,
                          buttonColor: "info",
                          mb: "",
                          mt: "",
                        }}
                      />
                    </Grid>
                  )}
                  {clubMatchGetData.isAdmin && (
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
                        実施状況:
                      </Typography>
                    </Grid>
                  )}
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
                      {clubMatchGetData.is_finish && (
                        <ColorButton
                          colorButton={{
                            buttonText: "完了",
                            onClick: handleSwitchFinish,
                            buttonColor: "info",
                            mb: "30px",
                            mt: "",
                          }}
                        />
                      )}
                    </Grid>
                  )}

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
                        参加状況:
                      </Typography>
                    </Grid>
                  )}

                  {!clubMatchGetData.isAdmin &&
                    !clubMatchGetData.is_create_team && (
                      <Grid item xs={8}>
                        <Grid container>
                          {clubMatchGetData.is_participant &&
                            currentTime < partiipantDeadlineDate && (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <ColorButton
                                      colorButton={{
                                        buttonText: "参加",
                                        onClick: handleParticipantDelete,
                                        buttonColor: "info",
                                        mb: "",
                                        mt: "",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          {clubMatchGetData.is_participant &&
                            currentTime > partiipantDeadlineDate && (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <Typography>参加（変更不可）</Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          {!clubMatchGetData.is_participant &&
                            currentTime < partiipantDeadlineDate && (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <ColorButton
                                      colorButton={{
                                        buttonText: "不参加",
                                        onClick: handleParticipantAdd,
                                        buttonColor: "info",
                                        mb: "",
                                        mt: "",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          {!clubMatchGetData.is_participant &&
                            currentTime > partiipantDeadlineDate && (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <Typography>不参加（変更不可）</Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                        </Grid>
                      </Grid>
                    )}

                  {!clubMatchGetData.isAdmin &&
                    clubMatchGetData.is_create_team && (
                      <Grid item xs={8}>
                        <Grid container>
                          {clubMatchGetData.is_participant &&
                            currentTime < partiipantDeadlineDate && (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <ColorButton
                                      colorButton={{
                                        buttonText: "参加",
                                        onClick: handleTeamMemberDelete,
                                        buttonColor: "info",
                                        mb: "",
                                        mt: "",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          {clubMatchGetData.is_participant &&
                            currentTime > partiipantDeadlineDate && (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <Typography>参加（変更不可）</Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          {!clubMatchGetData.is_participant &&
                            currentTime < partiipantDeadlineDate && (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <ColorButton
                                      colorButton={{
                                        buttonText: "不参加",
                                        onClick: handleTeamMemberAdd,
                                        buttonColor: "info",
                                        mb: "",
                                        mt: "",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          {!clubMatchGetData.is_participant &&
                            currentTime > partiipantDeadlineDate && (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <Typography>不参加（変更不可）</Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                        </Grid>
                      </Grid>
                    )}
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
                        参加者:
                      </Typography>
                    </Grid>
                  )}
                  {!clubMatchGetData.isAdmin && (
                    <Grid item xs={8}>
                      {clubMatchGetData.participant_num === 0 && (
                        <Typography
                          sx={{
                            fontsize: "15px",
                            py: "5px",
                          }}
                        >
                          まだ参加者がいません
                        </Typography>
                      )}
                      {clubMatchGetData.participant_num !== 0 && (
                        <ColorButton
                          colorButton={{
                            buttonText: "閲覧",
                            onClick: handleOpenParticipantList,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      )}
                    </Grid>
                  )}
                  <ParticipantNameList
                    backDropInfo={{
                      open: openParticipantList,
                      handleClose: handleCloseParticipantList,
                      club_match_id: clubMatchGetData.club_match_id,
                    }}
                  />

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
                        チーム:
                      </Typography>
                    </Grid>
                  )}
                  {!clubMatchGetData.isAdmin && (
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
                      {clubMatchGetData.is_create_team && (
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
                    </Grid>
                  )}
                  {!clubMatchGetData.isAdmin &&
                    clubMatchGetData.is_participant && (
                      <Grid item xs={4}>
                        {clubMatchGetData.is_add_match && (
                          <Typography
                            sx={{
                              mx: "15px",
                              fontWeight: "600",
                              fontsize: "15px",
                              py: "5px",
                              textAlign: "center",
                            }}
                          >
                            投票:
                          </Typography>
                        )}
                      </Grid>
                    )}

                  {!clubMatchGetData.isAdmin &&
                    clubMatchGetData.is_participant &&
                    clubMatchGetData.is_add_match && (
                      <Grid item xs={8}>
                        <ColorButton
                          colorButton={{
                            buttonText: "投票画面",
                            onClick: handleVoteMatchList,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
                      </Grid>
                    )}
                  {!clubMatchGetData.isAdmin && (
                    <Grid item xs={4}>
                      {clubMatchGetData.is_add_match && (
                        <Typography
                          sx={{
                            mx: "15px",
                            fontWeight: "600",
                            fontsize: "15px",
                            py: "5px",
                            textAlign: "center",
                          }}
                        >
                          途中結果:
                        </Typography>
                      )}
                    </Grid>
                  )}

                  {!clubMatchGetData.isAdmin &&
                    clubMatchGetData.is_add_match && (
                      <Grid item xs={8}>
                        <ColorButton
                          colorButton={{
                            buttonText: "閲覧",
                            onClick: handleInterimResultPage,
                            buttonColor: "info",
                            mb: "",
                            mt: "",
                          }}
                        />
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
export default ClubMatchCard;
