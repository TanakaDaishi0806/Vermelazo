import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import LoadingClubMatchFinishTemplate from "../templates/LoadingClubMatchFinishTemplate";

const LoadingClubMatchFinish = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;

  React.useEffect(() => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/admin/clubmatchs/isfinish/${club_match_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/admin/finish");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  return <LoadingClubMatchFinishTemplate />;
};

export default LoadingClubMatchFinish;
