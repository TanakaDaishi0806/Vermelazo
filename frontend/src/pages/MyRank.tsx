import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MyRankTemplate from "../templates/MyRankTemplate";
import { YourRankInfo } from "../type/velmelazo";

const MyRank = () => {
  const defaultMyRankData: YourRankInfo = {
    rank_all: 0,
    total_all: 0,
    rank_position: 0,
    total_position: 0,
    rank_experience: 0,
    total_experience: 0,
    goal_num: 0,
    rank_goal: 0,
    total_goal: 0,
    is_released: 0,
  };
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [yourRankInfo, setYourRankInfo] =
    React.useState<YourRankInfo>(defaultMyRankData);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/home/myrank/list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        setYourRankInfo(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);
  return <MyRankTemplate rankInfo={{ yourRankInfo: yourRankInfo }} />;
};

export default MyRank;
