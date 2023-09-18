import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import LoadingCreateMatchTemplate from "../templates/LoadingCreateMatchTemplate";

const LoadingCreateMatch = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, match_num } = state;

  React.useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/admin/match/combination/create`,
        {
          club_match_id,
          match_num: parseInt(match_num, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/admin/match/list", {
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
        if (error.response.status === 400) {
          navigate("/admin/match/create");
        }
      });
  }, []);

  return <LoadingCreateMatchTemplate />;
};

export default LoadingCreateMatch;
