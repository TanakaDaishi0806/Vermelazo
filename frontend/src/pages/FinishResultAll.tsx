import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import FinishResultAllTemplate from "../templates/FinishResultAllTemplate";
import { YourRankInfo } from "../type/velmelazo";

const FinishResultAll = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, is_finish, vnum, value } = state;
  return (
    <FinishResultAllTemplate
      finishResultAllInfo={{ club_match_id, is_finish, vnum, value }}
    />
  );
};

export default FinishResultAll;
