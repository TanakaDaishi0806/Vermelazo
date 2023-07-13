import React from "react";
import axios from "axios";

import MyRankTemplate from "../templates/MyRankTemplate";
import { MyRankData } from "../type/velmelazo";

const MyRank = () => {
  const defaultMyRankData: MyRankData = {
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
  const [myRank, setMyRank] = React.useState<MyRankData>(defaultMyRankData);

  React.useEffect(() => {
    axios
      .get(`http://localhost:18000/home/myrank/list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMyRank(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <MyRankTemplate myRankData={myRank} />;
};

export default MyRank;
