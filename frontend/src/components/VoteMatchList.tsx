import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import ColorButton from "../parts/ColorButton";
import {
  AddScoreMatchListInfo,
  MatchGetData,
  MyVoteBool,
  VoteKind,
} from "../type/velmelazo";
import { teamIdentifyData } from "../data/teamNameData";
import { TournamentResult } from "../type/velmelazo";
import { tournamentNameData } from "../data/teamNameData";

type Props = {
  matchListInfo: AddScoreMatchListInfo;
};

const VoteMatchList: React.FC<Props> = ({ matchListInfo }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [matchList, setMatchList] = React.useState<MatchGetData[]>([]);
  const [myVoteList, setMyVoteList] = React.useState<MyVoteBool[]>([]);
  const [voteKindList, setVoteKindList] = React.useState<VoteKind[]>([]);
  const [myVoteListExist, setMyVoteListExist] = React.useState(false);
  const [voteKindListExist, setVoteKindListExist] = React.useState(false);
  const [minTeamID, setMinTeamID] = React.useState(0);
  const [minTournamentMatchID, setMinTournamentMatchID] = React.useState(0);
  const [maxTournamentLevel, setMaxTournamentLevel] = React.useState(0);
  const [tempTournament, setTempTournament] = React.useState<
    TournamentResult[]
  >([]);
  const [tournament, setTournament] = React.useState<TournamentResult[]>([]);
  const [tournamentIndexList, setTournamentIndexList] = React.useState<
    number[]
  >([]);
  const [tournamentMatchNum, setTournamentMatchNum] =
    React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/match/list/${matchListInfo.club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setMatchList(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/tournament/result/list/${matchListInfo.club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTempTournament(response.data);
        setTournamentMatchNum(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/myisvote/list/${matchListInfo.club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setMyVoteList(response.data);
        console.log(response.data);
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/home/votekind/list/${matchListInfo.club_match_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            setVoteKindList(response.data);
            console.log(response.data);
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
  }, []);

  React.useEffect(() => {
    if (matchList !== undefined && matchList.length !== 0) {
      setMinTeamID(matchList[0].team_id_a);
      for (let index = 0; index < matchList.length; index++) {
        if (matchList[index].match_type === 1) {
          console.log(index);
          setMinTournamentMatchID(index);
          break;
        }
      }
    }
  }, [matchList]);
  React.useEffect(() => {
    if (myVoteList !== undefined && myVoteList.length !== 0) {
      setMyVoteListExist(true);
    }
  }, [myVoteList]);
  React.useEffect(() => {
    if (voteKindList !== undefined && voteKindList.length !== 0) {
      setVoteKindListExist(true);
    }
  }, [voteKindList]);

  React.useEffect(() => {
    if (
      tempTournament !== undefined &&
      tempTournament.length !== 0 &&
      tournamentMatchNum !== -1
    ) {
      tempTournament.sort((a, b) => a.match_id - b.match_id);
      let nonZeroTournament = tempTournament.filter(
        (item) => item.match_id !== 0
      ); // match_id が 0 でない要素
      let zeroTournament = tempTournament.filter((item) => item.match_id === 0); // match_id が 0 の要素

      let t = [...nonZeroTournament, ...zeroTournament];
      setTournament(t);
      console.log(t);
      let tempLevel: number = -1;
      let i: number = 1;
      let tempTournamentIndexList: number[] = [];
      console.log(t[0].match_level);
      setMaxTournamentLevel(t[0].match_level);
      t.map((tour, index) => {
        if (tempLevel !== tour.match_level) {
          tempLevel = tour.match_level;
          i = 1;
        }
        console.log(i);
        tempTournamentIndexList.push(i);
        i++;
      });
      console.log(tempTournamentIndexList);
      setTournamentIndexList(tempTournamentIndexList);
    }
  }, [tempTournament, tournamentMatchNum]);

  return (
    <Grid>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mb: "30px" }}
        >
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            投票テーブル
          </Typography>
        </Grid>
      </Grid>
      {matchList?.length > 0 &&
        tournament?.length === tournamentMatchNum &&
        tournamentIndexList?.length === tournamentMatchNum &&
        voteKindList?.length > 0 &&
        myVoteList?.length > 0 &&
        matchList.map((match, index) =>
          !voteKindList[index].vote_kind_num ? (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              sx={{ mb: "20px", color: "#2196F3" }}
              key={index}
            >
              {match.match_type === 0 ? (
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      borderLeft: "3px solid #888888",
                      pl: "5px",
                    }}
                  >
                    予選
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      borderLeft: "3px solid #888888",
                      pl: "5px",
                    }}
                  >
                    {index + 1}試合目
                  </Typography>
                </Grid>
              ) : tournament[index - minTournamentMatchID].match_level <=
                tournamentNameData.length - 1 ? (
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      borderLeft: "3px solid #888888",
                      pl: "5px",
                    }}
                  >
                    {
                      tournamentNameData[
                        tournament[index - minTournamentMatchID].match_level
                      ]
                    }
                  </Typography>
                  {tournament[index - minTournamentMatchID].match_level !==
                    0 && (
                    <Typography
                      sx={{
                        fontSize: "17px",
                        borderLeft: "3px solid #888888",
                        pl: "5px",
                      }}
                    >
                      {tournamentIndexList[index - minTournamentMatchID]}
                      試合目
                    </Typography>
                  )}
                </Grid>
              ) : (
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      borderLeft: "3px solid #888888",
                      pl: "5px",
                    }}
                  >
                    {maxTournamentLevel -
                      tournament[index - minTournamentMatchID].match_level +
                      1}
                    回戦
                  </Typography>
                  {tournament[index - minTournamentMatchID].match_level !==
                    0 && (
                    <Typography
                      sx={{
                        fontSize: "17px",
                        borderLeft: "3px solid #888888",
                        pl: "5px",
                      }}
                    >
                      {tournamentIndexList[index - minTournamentMatchID]}
                      試合目
                    </Typography>
                  )}
                </Grid>
              )}

              <Grid item xs={5}>
                <Grid container alignItems="center" justifyContent="center">
                  <Typography variant="h6" sx={{ fontSize: "25px" }}>
                    {teamIdentifyData[match.team_id_a - minTeamID]} vs{"  "}
                    {teamIdentifyData[match.team_id_b - minTeamID]}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container alignItems="center" justifyContent="center">
                  {voteKindListExist &&
                    myVoteListExist &&
                    !voteKindList[index].vote_kind_num &&
                    !myVoteList[index].is_vote && (
                      <ColorButton
                        colorButton={{
                          buttonText: "投票",
                          onClick: () => {
                            navigate("/home/vote/myteam", {
                              state: {
                                club_match_id: match.club_match_id,
                                team_id: myVoteList[index].team_id,
                                match_id: match.match_id,
                                user_id: myVoteList[index].user_id,
                              },
                            });
                          },
                          buttonColor: "info",
                          mb: "",
                          mt: "",
                        }}
                      />
                    )}
                  {voteKindListExist &&
                    myVoteListExist &&
                    !voteKindList[index].vote_kind_num &&
                    myVoteList[index].is_vote && (
                      <Typography
                        sx={{
                          fontSize: "17px",
                          pl: "5px",
                        }}
                      >
                        投票済み
                      </Typography>
                    )}
                  {voteKindListExist &&
                    myVoteListExist &&
                    voteKindList[index].vote_kind_num &&
                    !myVoteList[index].is_vote && (
                      <ColorButton
                        colorButton={{
                          buttonText: "投票(match)",
                          onClick: () => {
                            navigate("/home/vote/match", {
                              state: {
                                club_match_id: match.club_match_id,
                                team_id_a: match.team_id_a,
                                team_id_b: match.team_id_b,
                                team_name_a:
                                  teamIdentifyData[match.team_id_a - minTeamID],
                                team_name_b:
                                  teamIdentifyData[match.team_id_b - minTeamID],
                                match_id: match.match_id,
                                user_id: myVoteList[index].user_id,
                              },
                            });
                          },
                          buttonColor: "info",
                          mb: "",
                          mt: "",
                        }}
                      />
                    )}
                  {voteKindListExist &&
                    myVoteListExist &&
                    voteKindList[index].vote_kind_num &&
                    myVoteList[index].is_vote && (
                      <Typography
                        sx={{
                          fontSize: "17px",
                          pl: "5px",
                        }}
                      >
                        投票済み
                      </Typography>
                    )}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              sx={{ mb: "20px" }}
              key={index}
            >
              {match.match_type === 0 ? (
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      borderLeft: "3px solid #888888",
                      pl: "5px",
                    }}
                  >
                    予選
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      borderLeft: "3px solid #888888",
                      pl: "5px",
                    }}
                  >
                    {index + 1}試合目
                  </Typography>
                </Grid>
              ) : tournament[index - minTournamentMatchID].match_level <=
                tournamentNameData.length - 1 ? (
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      borderLeft: "3px solid #888888",
                      pl: "5px",
                    }}
                  >
                    {
                      tournamentNameData[
                        tournament[index - minTournamentMatchID].match_level
                      ]
                    }
                  </Typography>
                  {tournament[index - minTournamentMatchID].match_level !==
                    0 && (
                    <Typography
                      sx={{
                        fontSize: "17px",
                        borderLeft: "3px solid #888888",
                        pl: "5px",
                      }}
                    >
                      {tournamentIndexList[index - minTournamentMatchID]}
                      試合目
                    </Typography>
                  )}
                </Grid>
              ) : (
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      borderLeft: "3px solid #888888",
                      pl: "5px",
                    }}
                  >
                    {maxTournamentLevel -
                      tournament[index - minTournamentMatchID].match_level +
                      1}
                    回戦
                  </Typography>
                  {tournament[index - minTournamentMatchID].match_level !==
                    0 && (
                    <Typography
                      sx={{
                        fontSize: "17px",
                        borderLeft: "3px solid #888888",
                        pl: "5px",
                      }}
                    >
                      {tournamentIndexList[index - minTournamentMatchID]}
                      試合目
                    </Typography>
                  )}
                </Grid>
              )}

              <Grid item xs={5}>
                <Grid container alignItems="center" justifyContent="center">
                  <Typography variant="h6" sx={{ fontSize: "25px" }}>
                    {teamIdentifyData[match.team_id_a - minTeamID]} vs{"  "}
                    {teamIdentifyData[match.team_id_b - minTeamID]}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container alignItems="center" justifyContent="center">
                  {voteKindListExist &&
                    myVoteListExist &&
                    !voteKindList[index].vote_kind_num &&
                    !myVoteList[index].is_vote && (
                      <ColorButton
                        colorButton={{
                          buttonText: "投票 (my team)",
                          onClick: () => {
                            navigate("/home/vote/myteam", {
                              state: {
                                club_match_id: match.club_match_id,
                                team_id: myVoteList[index].team_id,
                                match_id: match.match_id,
                                user_id: myVoteList[index].user_id,
                              },
                            });
                          },
                          buttonColor: "info",
                          mb: "",
                          mt: "",
                        }}
                      />
                    )}
                  {voteKindListExist &&
                    myVoteListExist &&
                    !voteKindList[index].vote_kind_num &&
                    myVoteList[index].is_vote && (
                      <Typography
                        sx={{
                          fontSize: "17px",
                          pl: "5px",
                        }}
                      >
                        投票済み
                      </Typography>
                    )}
                  {voteKindListExist &&
                    myVoteListExist &&
                    voteKindList[index].vote_kind_num &&
                    !myVoteList[index].is_vote && (
                      <ColorButton
                        colorButton={{
                          buttonText: "投票",
                          onClick: () => {
                            navigate("/home/vote/match", {
                              state: {
                                club_match_id: match.club_match_id,
                                team_id_a: match.team_id_a,
                                team_id_b: match.team_id_b,
                                team_name_a:
                                  teamIdentifyData[match.team_id_a - minTeamID],
                                team_name_b:
                                  teamIdentifyData[match.team_id_b - minTeamID],
                                match_id: match.match_id,
                                user_id: myVoteList[index].user_id,
                              },
                            });
                          },
                          buttonColor: "info",
                          mb: "",
                          mt: "",
                        }}
                      />
                    )}
                  {voteKindListExist &&
                    myVoteListExist &&
                    voteKindList[index].vote_kind_num &&
                    myVoteList[index].is_vote && (
                      <Typography
                        sx={{
                          fontSize: "17px",
                          pl: "5px",
                        }}
                      >
                        投票済み
                      </Typography>
                    )}
                </Grid>
              </Grid>
            </Grid>
          )
        )}
    </Grid>
  );
};

export default VoteMatchList;
