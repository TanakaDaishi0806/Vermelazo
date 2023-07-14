import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import ColorButton from "../parts/ColorButton";
import { AddScoreMatchListInfo, MatchGetData } from "../type/velmelazo";
import { teamIdentifyData } from "../data/teamNameData";

type Props = {
  matchListInfo: AddScoreMatchListInfo;
};

const AddScoreMatchList: React.FC<Props> = ({ matchListInfo }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [matchList, setMatchList] = React.useState<MatchGetData[]>([]);
  const [minTeamID, setMinTeamID] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:18000/admin/match/list/${matchListInfo.club_match_id}`,
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
          navigate("/adminlogin");
        }
      });
  }, []);

  React.useEffect(() => {
    if (matchList !== undefined && matchList.length !== 0) {
      setMinTeamID(matchList[0].team_id_a);
    }
  }, [matchList]);

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
            key={index}
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

            <Grid item xs={6}>
              <Grid container alignItems="center" justifyContent="center">
                <Typography variant="h6" sx={{ fontSize: "25px" }}>
                  {teamIdentifyData[match.team_id_a - minTeamID]} vs{"  "}
                  {teamIdentifyData[match.team_id_b - minTeamID]}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              {!match.is_resister && (
                <ColorButton
                  colorButton={{
                    buttonText: "登録",
                    onClick: () => {
                      navigate("/admin/match/result/add", {
                        state: {
                          club_match_id: match.club_match_id,
                          match_id: match.match_id,
                          team_id_a: match.team_id_a,
                          team_id_b: match.team_id_b,
                          team_name_a:
                            teamIdentifyData[match.team_id_a - minTeamID],
                          team_name_b:
                            teamIdentifyData[match.team_id_b - minTeamID],
                          score_a: match.score_a,
                          score_b: match.score_b,
                        },
                      });
                    },
                    buttonColor: "info",
                    mb: "",
                    mt: "",
                  }}
                />
              )}
              {match.is_resister && (
                <ColorButton
                  colorButton={{
                    buttonText: "変更",
                    onClick: () => {
                      navigate("/admin/match/result/add", {
                        state: {
                          club_match_id: match.club_match_id,
                          match_id: match.match_id,
                          team_id_a: match.team_id_a,
                          team_id_b: match.team_id_b,
                          team_name_a:
                            teamIdentifyData[match.team_id_a - minTeamID],
                          team_name_b:
                            teamIdentifyData[match.team_id_b - minTeamID],
                          score_a: match.score_a,
                          score_b: match.score_b,
                        },
                      });
                    },
                    buttonColor: "info",
                    mb: "",
                    mt: "",
                  }}
                />
              )}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default AddScoreMatchList;
