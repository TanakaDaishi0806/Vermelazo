import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import { ResultPageInfo } from "../type/velmelazo";
import { MatchGetData } from "../type/velmelazo";
import { teamIdentifyData } from "../data/teamNameData";
import ColorButton from "../parts/ColorButton";

type Props = {
  resultPageInfo: ResultPageInfo;
};

const ResultList: React.FC<Props> = ({ resultPageInfo }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [matchList, setMatchList] = React.useState<MatchGetData[]>([]);
  const [minTeamID, setMinTeamID] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:18000/home/match/list/${resultPageInfo.club_match_id}`,
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
  }, []);

  React.useEffect(() => {
    if (matchList !== undefined && matchList.length !== 0) {
      setMinTeamID(matchList[0].team_id_a);
    }
  }, [matchList]);

  const handleResultDetailNavigate =
    (
      team_id_a: number,
      team_id_b: number,
      team_name_a: string,
      team_name_b: string,
      match_id: number,
      score_a: number,
      score_b: number
    ) =>
    () => {
      navigate("/home/result/detail", {
        state: {
          club_match_id: resultPageInfo.club_match_id,
          is_finish: resultPageInfo.is_finish,
          team_id_a: team_id_a,
          team_id_b: team_id_b,
          team_name_a: team_name_a,
          team_name_b: team_name_b,
          match_id: match_id,
          score_a: score_a,
          score_b: score_b,
        },
      });
    };

  return (
    <Grid>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: "30px", mb: "40px" }}
        >
          {!resultPageInfo.is_finish && (
            <Typography variant="h5" sx={{ fontWeight: "600" }}>
              途中結果
            </Typography>
          )}
          {resultPageInfo.is_finish && (
            <Typography variant="h5" sx={{ fontWeight: "600" }}>
              最終結果
            </Typography>
          )}
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
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontSize: "17px",
                  borderLeft: "3px solid #888888",
                  pl: "5px",
                  ml: "30px",
                  mb: "10px",
                }}
              >
                {index + 1}試合目
              </Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Grid container alignItems="center" justifyContent="center">
                <Typography variant="h6" sx={{ fontSize: "25px" }}>
                  {teamIdentifyData[match.team_id_a - minTeamID]}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center" justifyContent="center">
                {match.score_a !== -1 && (
                  <Typography variant="h6" sx={{ fontSize: "25px" }}>
                    {match.score_a} ー {match.score_b}
                  </Typography>
                )}
                {match.score_a === -1 && (
                  <Typography variant="h6" sx={{ fontSize: "25px" }}>
                    ー
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container alignItems="center" justifyContent="center">
                <Typography variant="h6" sx={{ fontSize: "25px" }}>
                  {teamIdentifyData[match.team_id_b - minTeamID]}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Grid container alignItems="center" justifyContent="center">
                <ColorButton
                  colorButton={{
                    buttonText: "試合詳細",
                    onClick: handleResultDetailNavigate(
                      match.team_id_a,
                      match.team_id_b,
                      teamIdentifyData[match.team_id_a - minTeamID],
                      teamIdentifyData[match.team_id_b - minTeamID],
                      match.match_id,
                      match.score_a,
                      match.score_b
                    ),
                    buttonColor: "info",
                    mb: "10px",
                    mt: "",
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default ResultList;
