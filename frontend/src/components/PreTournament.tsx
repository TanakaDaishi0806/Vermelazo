import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import EmojiEvents from "@mui/icons-material/EmojiEvents";

import { Tournament, TournamentTeamAndRank } from "../type/velmelazo";
import PreTournamentParts from "../parts/PreTournamentParts";
import { teamNameData } from "../data/teamNameData";
import { PreTournamentViewInfo } from "../type/velmelazo";

type Props = {
  preTournamentViewInfo: PreTournamentViewInfo;
};

const PreTournament: React.FC<Props> = ({ preTournamentViewInfo }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament[]>([]);
  const [tournamentBool, setTournamentBool] = useState<boolean[][]>([]);
  const [tournamentList, setTournamentList] = useState<Tournament[][]>([]);
  const [tournamentTeamAndRank, setTournamentTeamAndRank] = useState<
    TournamentTeamAndRank[]
  >([]);
  const [minTeamID, setMinTeamID] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/tournament/team/rank/${preTournamentViewInfo.club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTournamentTeamAndRank(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/pretournament/${preTournamentViewInfo.club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTournament(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    console.log("aaaa");
    if (
      tournament !== undefined &&
      tournament.length !== 0 &&
      tournamentTeamAndRank !== undefined &&
      tournamentTeamAndRank.length !== 0
    ) {
      let min_id: number = 1000000;
      tournament.map((t, index) => {
        if (t.team_id_a < min_id) {
          min_id = t.team_id_a;
        }
        if (t.team_id_b < min_id) {
          min_id = t.team_id_b;
        }

        setMinTeamID(min_id);
      });

      let depth: number = 0;
      tournament.forEach((tour) => {
        if (tour.match_level > depth) {
          depth = tour.match_level;
        }
      });

      // console.log(depth);
      let blist: boolean[][] = [];
      let b: boolean[] = [true];
      let btmps: boolean[] = [];
      let tlist: Tournament[][] = [];
      let t: Tournament[] = [];
      let left: number;
      let right: number;
      let num: number = 0;
      let tmp: number = 0;
      t.push(tournament[num]);
      tlist.push(t);
      t = [];
      blist.push(b);
      btmps = b;
      b = [];
      for (let i = 0; i < depth; i++) {
        console.log(i);
        btmps.map((btmp, index) => {
          if (btmp) {
            left = tournament[num].team_id_a;
            right = tournament[num].team_id_b;
            let bl: boolean = false;
            let br: boolean = false;

            for (let j = num + 1; j < tournament.length; j++) {
              console.log(j);
              if (tournament[j].match_level > tournament[num].match_level + 1) {
                break;
              }
              if (
                tournament[j].match_level ===
                tournament[num].match_level + 1
              ) {
                if (left === tournament[j].team_id_a) {
                  bl = true;
                }
                if (left === tournament[j].team_id_b) {
                  bl = true;
                }
                if (right === tournament[j].team_id_a) {
                  br = true;
                }
                if (right === tournament[j].team_id_b) {
                  br = true;
                }
              }
            }

            b.push(left === 0 || bl);
            if (left === 0 || bl) {
              tmp++;
              console.log(num);
              console.log(tmp);
              t.push(tournament[tmp]);
            }
            b.push(right === 0 || br);
            if (right === 0 || br) {
              tmp++;
              console.log(num);
              console.log(tmp);
              t.push(tournament[tmp]);
            }
            num++;
          }
        });

        blist.push(b);
        tlist.push(t);
        btmps = b;
        b = [];
        t = [];
      }
      console.log(blist);
      setTournamentBool(blist);
      console.log(tlist);
      setTournamentList(tlist);
    }
  }, [tournament, tournamentTeamAndRank]);

  return (
    <Grid sx={{ mt: "50px", mb: "50px" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{ width: "100%", mb: "60px" }}
        >
          <EmojiEvents sx={{ fontSize: 60, color: "gold" }} />

          <Grid sx={{ border: "3px solid #eee", height: "20px" }} />

          {tournamentList &&
            tournamentBool &&
            tournamentTeamAndRank &&
            tournamentBool.map((tb, index) => (
              <PreTournamentParts
                key={index}
                tpi={{
                  tb,
                  tr: tournamentList[index],
                  lastb: tournamentBool.length === index + 1,
                  ttar: tournamentTeamAndRank,
                  ptvi: preTournamentViewInfo,
                }}
              />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PreTournament;
