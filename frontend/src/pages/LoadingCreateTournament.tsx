import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import LoadingCreateTournamentTemplate from "../templates/LoadingCreateTournamentTemplate";

const LoadingCreateTournament = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, is_finish, vnum } = state;
  let b: boolean = true;

  React.useEffect(() => {
    if (b) {
      b = false;
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/admin/tournament/create`,
          {
            club_match_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          navigate("/admin/tournament/view", {
            state: {
              club_match_id,
              is_finish,
              vnum,
            },
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/");
          }
        });
    }
  }, []);

  return <LoadingCreateTournamentTemplate />;
};

export default LoadingCreateTournament;
