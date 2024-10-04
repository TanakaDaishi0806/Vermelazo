import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import InterimResultAllTemplate from "../templates/InterimResultAllTemplate";
import { YourRankInfo } from "../type/velmelazo";

const InterimResultAll = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, is_finish, vnum, value } = state;
  const [tournamentCreated, setTournamentCreated] = React.useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/tournament/list/${club_match_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.length);
        if (response.data.length !== 0) {
          setTournamentCreated(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/adminlogin");
        }
      });
  }, []);
  return (
    <InterimResultAllTemplate
      interimResultAllInfo={{
        club_match_id,
        is_finish,
        vnum,
        tournamentCreated,
        value,
      }}
    />
  );
};

export default InterimResultAll;
