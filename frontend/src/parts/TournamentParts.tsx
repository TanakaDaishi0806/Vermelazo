import React from "react";
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Description } from "@mui/icons-material";

import { TournamentPartsInfo } from "../type/velmelazo";
import { teamIdentifyData } from "../data/teamNameData";

type Props = {
  tpi: TournamentPartsInfo;
};

const TournamentParts: React.FC<Props> = ({ tpi }) => {
  const navigate = useNavigate();
  const [minTeamID, setMinTeamID] = React.useState(0);
  const tpnum: number = tpi.tb.length;
  const gw: number = 12 / tpnum;
  let num: number = 0;

  console.log(tpi);

  React.useEffect(() => {
    let min_id: number = 1000000;
    tpi.ttar.map((t, index) => {
      if (t.team_id < min_id) {
        min_id = t.team_id;
      }
    });

    setMinTeamID(min_id);
  }, []);

  const handleResultDetailNavigate = (
    team_id_a: number,
    team_id_b: number,
    team_name_a: string,
    team_name_b: string,
    match_id: number,
    score_a: number,
    score_b: number,
    pk_a: number,
    pk_b: number,
    url: string,
    value: number
  ) => {
    console.log(pk_a);
    navigate("/home/result/detail", {
      state: {
        club_match_id: tpi.tvi.club_match_id,
        is_finish: tpi.tvi.is_finish,
        team_id_a: team_id_a,
        team_id_b: team_id_b,
        team_name_a: team_name_a,
        team_name_b: team_name_b,
        match_id: match_id,
        score_a: score_a,
        score_b: score_b,
        vnum: tpi.tvi.vnum,
        pk_a: pk_a,
        pk_b: pk_b,
        url: url,
        value: value,
      },
    });
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      {tpi.tb.map((b, index) => (
        <Grid item xs={gw} key={index}>
          {b ? ( // bがtrueの場合の表示
            tpi.tr[index].score_a !== -1 ? (
              tpi.tr[index].score_a > tpi.tr[index].score_b ||
              tpi.tr[index].pk_a > tpi.tr[index].pk_b ? (
                <Grid container alignItems="center" justifyContent="center">
                  <Grid
                    item
                    xs={3}
                    sx={{ borderRight: "3px solid #333", height: "100px" }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      borderTop: "3px solid #333",
                      borderLeft: "3px solid #333",
                      height: "100px",
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
                        {tpi.tr[index].score_a}
                      </Typography>
                      {tpi.tr[index].pk_a !== 0 && tpi.tr[index].pk_b !== 0 && (
                        <Typography sx={{ color: "#888" }}>
                          {tpi.tr[index].pk_a}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      borderTop: "3px solid #eee",
                      borderRight: "3px solid #333",
                      height: "100px",
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
                        {tpi.tr[index].score_b}
                      </Typography>
                      {tpi.tr[index].pk_a !== 0 && tpi.tr[index].pk_b !== 0 && (
                        <Typography sx={{ color: "#888" }}>
                          {tpi.tr[index].pk_b}
                        </Typography>
                      )}

                      <Description
                        sx={{ color: "#2196F3" }}
                        onClick={() =>
                          handleResultDetailNavigate(
                            tpi.tr[index].team_id_a,
                            tpi.tr[index].team_id_b,
                            teamIdentifyData[
                              tpi.tr[index].team_id_a - minTeamID
                            ],
                            teamIdentifyData[
                              tpi.tr[index].team_id_b - minTeamID
                            ],
                            tpi.tr[index].match_id,
                            tpi.tr[index].score_a,
                            tpi.tr[index].score_b,
                            tpi.tr[index].pk_a,
                            tpi.tr[index].pk_b,
                            tpi.tvi.url,
                            1
                          )
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    sx={{ borderLeft: "3px solid #333", height: "100px" }}
                  ></Grid>
                </Grid>
              ) : (
                <Grid container alignItems="center" justifyContent="center">
                  <Grid
                    item
                    xs={3}
                    sx={{ borderRight: "3px solid #333", height: "100px" }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      borderTop: "3px solid #eee",
                      borderLeft: "3px solid #333",
                      height: "100px",
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
                        {tpi.tr[index].score_a}
                      </Typography>
                      {tpi.tr[index].pk_a !== 0 && tpi.tr[index].pk_b !== 0 && (
                        <Typography sx={{ color: "#888" }}>
                          {tpi.tr[index].pk_a}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      borderTop: "3px solid #333",
                      borderRight: "3px solid #333",
                      height: "100px",
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
                        {tpi.tr[index].score_b}
                      </Typography>
                      {tpi.tr[index].pk_a !== 0 && tpi.tr[index].pk_b !== 0 && (
                        <Typography sx={{ color: "#888" }}>
                          {tpi.tr[index].pk_b}
                        </Typography>
                      )}
                      <Description
                        sx={{ color: "#2196F3" }}
                        onClick={() =>
                          handleResultDetailNavigate(
                            tpi.tr[index].team_id_a,
                            tpi.tr[index].team_id_b,
                            teamIdentifyData[
                              tpi.tr[index].team_id_a - minTeamID
                            ],
                            teamIdentifyData[
                              tpi.tr[index].team_id_b - minTeamID
                            ],
                            tpi.tr[index].match_id,
                            tpi.tr[index].score_a,
                            tpi.tr[index].score_b,
                            tpi.tr[index].pk_a,
                            tpi.tr[index].pk_b,
                            tpi.tvi.url,
                            1
                          )
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    sx={{ borderLeft: "3px solid #333", height: "100px" }}
                  ></Grid>
                </Grid>
              )
            ) : tpi.tr[index].team_id_a !== 0 &&
              tpi.tr[index].team_id_b !== 0 ? (
              <Grid container alignItems="center" justifyContent="center">
                <Grid
                  item
                  xs={3}
                  sx={{ borderRight: "3px solid #333", height: "100px" }}
                ></Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    borderTop: "3px solid #eee",
                    borderLeft: "3px solid #333",
                    height: "100px",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    borderTop: "3px solid #eee",
                    borderRight: "3px solid #333",
                    height: "100px",
                  }}
                ></Grid>

                <Grid
                  item
                  xs={3}
                  sx={{ borderLeft: "3px solid #333", height: "100px" }}
                ></Grid>
              </Grid>
            ) : tpi.tr[index].team_id_a === 0 &&
              tpi.tr[index].team_id_b !== 0 ? (
              <Grid container alignItems="center" justifyContent="center">
                <Grid
                  item
                  xs={3}
                  sx={{ borderRight: "3px solid #eee", height: "100px" }}
                ></Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    borderTop: "3px solid #eee",
                    borderLeft: "3px solid #eee",
                    height: "100px",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    borderTop: "3px solid #eee",
                    borderRight: "3px solid #333",
                    height: "100px",
                  }}
                ></Grid>

                <Grid
                  item
                  xs={3}
                  sx={{ borderLeft: "3px solid #333", height: "100px" }}
                ></Grid>
              </Grid>
            ) : tpi.tr[index].team_id_a !== 0 &&
              tpi.tr[index].team_id_b === 0 ? (
              <Grid container alignItems="center" justifyContent="center">
                <Grid
                  item
                  xs={3}
                  sx={{ borderRight: "3px solid #333", height: "100px" }}
                ></Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    borderTop: "3px solid #eee",
                    borderLeft: "3px solid #333",
                    height: "100px",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    borderTop: "3px solid #eee",
                    borderRight: "3px solid #eee",
                    height: "100px",
                  }}
                ></Grid>

                <Grid
                  item
                  xs={3}
                  sx={{ borderLeft: "3px solid #eee", height: "100px" }}
                ></Grid>
              </Grid>
            ) : (
              tpi.tr[index].team_id_a === 0 &&
              tpi.tr[index].team_id_b === 0 && (
                <Grid container alignItems="center" justifyContent="center">
                  <Grid
                    item
                    xs={3}
                    sx={{ borderRight: "3px solid #eee", height: "100px" }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      borderTop: "3px solid #eee",
                      borderLeft: "3px solid #eee",
                      height: "100px",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      borderTop: "3px solid #eee",
                      borderRight: "3px solid #eee",
                      height: "100px",
                    }}
                  ></Grid>

                  <Grid
                    item
                    xs={3}
                    sx={{ borderLeft: "3px solid #eee", height: "100px" }}
                  ></Grid>
                </Grid>
              )
            )
          ) : (
            // bがfalseの場合の表示
            <Grid container alignItems="center" justifyContent="center">
              <Grid
                item
                xs={6}
                sx={{ borderRight: "3px solid #333333", height: "100px" }}
              ></Grid>
              <Grid
                item
                xs={6}
                sx={{
                  borderLeft: "3px solid #333333",
                  height: "100px",
                }}
              ></Grid>
            </Grid>
          )}
        </Grid>
      ))}
      {tpi.lastb &&
        tpi.tb.map((b, index) => (
          <Grid item xs={gw} key={index}>
            {b ? ( // bがtrueの場合の表示
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Grid
                      item
                      sx={{
                        width: "28px",
                        border: "1px solid #333333",
                        pb: "5px",
                      }}
                    >
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                      >
                        <Typography
                          sx={{ fontSize: "22px", fontWeight: "600" }}
                        >
                          {teamIdentifyData[tpi.ttar[num].team_id - minTeamID]}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          予
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          選
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          {tpi.ttar[num++].rank}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          位
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Grid
                      item
                      sx={{
                        width: "28px",
                        border: "1px solid #333333",
                        pb: "5px",
                      }}
                      xs={6}
                    >
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                      >
                        <Typography
                          sx={{ fontSize: "22px", fontWeight: "600" }}
                        >
                          {teamIdentifyData[tpi.ttar[num].team_id - minTeamID]}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          予
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          選
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          {tpi.ttar[num++].rank}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          位
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              // bがfalseの場合の表示
              <Grid container alignItems="center" justifyContent="center">
                <Grid
                  item
                  sx={{ width: "28px", border: "1px solid #333333", pb: "5px" }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
                      {teamIdentifyData[tpi.ttar[num].team_id - minTeamID]}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#888" }}>
                      予
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#888" }}>
                      選
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#888" }}>
                      {tpi.ttar[num++].rank}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#888" }}>
                      位
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        ))}
    </Grid>
  );
};

export default TournamentParts;
