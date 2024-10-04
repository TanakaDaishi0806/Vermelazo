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

import { PreTournamentPartsInfo } from "../type/velmelazo";
import { teamIdentifyData } from "../data/teamNameData";

type Props = {
  tpi: PreTournamentPartsInfo;
};

const PreTournamentParts: React.FC<Props> = ({ tpi }) => {
  const navigate = useNavigate();
  const [minTeamID, setMinTeamID] = React.useState(0);
  const tpnum: number = tpi.tb.length;
  const gw: number = 12 / tpnum;
  let num: number = 0;
  let tr_num: number = 0;
  console.log(tpi.tr);

  React.useEffect(() => {
    let min_id: number = 1000000;
    tpi.ttar.map((t, index) => {
      if (t.team_id < min_id) {
        min_id = t.team_id;
      }
    });

    setMinTeamID(min_id);
  }, []);

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
          ) : (
            // bがfalseの場合の表示
            <Grid container alignItems="center" justifyContent="center">
              <Grid
                item
                xs={6}
                sx={{ borderRight: "3px solid #eee", height: "100px" }}
              ></Grid>
              <Grid
                item
                xs={6}
                sx={{
                  borderLeft: "3px solid #eee",
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
                        <Typography sx={{ fontSize: "20px", color: "#888" }}>
                          予
                        </Typography>
                        <Typography sx={{ fontSize: "20px", color: "#888" }}>
                          選
                        </Typography>
                        <Typography sx={{ fontSize: "20px", color: "#888" }}>
                          {tpi.ttar[num++].rank}
                        </Typography>
                        <Typography sx={{ fontSize: "20px", color: "#888" }}>
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
                        <Typography sx={{ fontSize: "20px", color: "#888" }}>
                          予
                        </Typography>
                        <Typography sx={{ fontSize: "20px", color: "#888" }}>
                          選
                        </Typography>
                        <Typography sx={{ fontSize: "20px", color: "#888" }}>
                          {tpi.ttar[num++].rank}
                        </Typography>
                        <Typography sx={{ fontSize: "20px", color: "#888" }}>
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
                    <Typography sx={{ fontSize: "20px", color: "#888" }}>
                      予
                    </Typography>
                    <Typography sx={{ fontSize: "20px", color: "#888" }}>
                      選
                    </Typography>
                    <Typography sx={{ fontSize: "20px", color: "#888" }}>
                      {tpi.ttar[num++].rank}
                    </Typography>
                    <Typography sx={{ fontSize: "20px", color: "#888" }}>
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

export default PreTournamentParts;
