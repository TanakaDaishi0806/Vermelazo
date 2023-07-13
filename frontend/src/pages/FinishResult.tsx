import { useLocation } from "react-router-dom";

import FinishResultTemplate from "../templates/FinishResultTemplate";

const FinishResult = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;
  return <FinishResultTemplate clubMatchID={club_match_id} />;
};

export default FinishResult;
