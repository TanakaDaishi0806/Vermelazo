import React from "react";
import { Typography, Grid, Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  BackDropParticipantInfo,
  ParticipantNameInfo,
} from "../type/velmelazo";

type Props = {
  backDropInfo: BackDropParticipantInfo;
};

const ParticipantNameList: React.FC<Props> = ({ backDropInfo }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [participantList, setParticipantList] = React.useState<
    ParticipantNameInfo[]
  >([]);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/participantname/list/${backDropInfo.club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setParticipantList(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, [backDropInfo.open]);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
      open={backDropInfo.open}
      onClick={backDropInfo.handleClose}
    >
      <Grid
        container
        justifyContent="left"
        alignContent="flex-start"
        sx={{
          bgcolor: "white",
          width: "50%",
          height: "50%",
          p: "20px",
          color: "black",
          overflow: "auto",
          display: "flex",
        }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            sx={{ pb: "30px" }}
          >
            <Typography
              sx={{ color: "#2196F3", fontSize: "18px", fontWeight: "800" }}
            >
              現在の参加者
            </Typography>
          </Grid>
        </Grid>
        {participantList.length !== 0 &&
          participantList.map((participant, index) => (
            <Grid item xs={12} key={index}>
              <Grid container justifyContent="center" alignContent="center">
                <Typography sx={{ mb: "10px", fontWeight: "600" }}>
                  {participant.name}
                </Typography>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Backdrop>
  );
};

export default ParticipantNameList;
