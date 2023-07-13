import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import ColorButton from "../parts/ColorButton";
import {
  AddScoreMatchListInfo,
  MatchGetData,
  MyVoteBool,
  VoteKind,
} from "../type/velmelazo";
import { teamIdentifyData } from "../data/teamNameData";

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

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:18000/home/match/list/${matchListInfo.club_match_id}`,
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
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:18000/home/myisvote/list/${matchListInfo.club_match_id}`,
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
            `http://localhost:18000/home/votekind/list/${matchListInfo.club_match_id}`,
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
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    if (matchList !== undefined && matchList.length !== 0) {
      setMinTeamID(matchList[0].team_id_a);
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
            試合テーブル
          </Typography>
        </Grid>
      </Grid>
      {matchList &&
        matchList.map((match, index) => (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ mb: "20px" }}
          >
            <Grid item xs={3}>
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
                        buttonText: "投票(myteam)",
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
        ))}
    </Grid>
  );
};

export default VoteMatchList;
