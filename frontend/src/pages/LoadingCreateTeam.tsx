import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import LoadingCreateTeamTemplate from "../templates/LoadingCreateTeamTemplate";

const LoadingCreateTeam = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, team_num } = state;

  React.useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/admin/team/create`,
        {
          club_match_id,
          team_num: parseInt(team_num, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/admin/team/change", {
          state: {
            club_match_id,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/adminlogin");
        }
      });
  }, []);

  return <LoadingCreateTeamTemplate />;
};

export default LoadingCreateTeam;
