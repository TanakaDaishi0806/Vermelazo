import { useLocation } from "react-router-dom";

import InterimResultTemplate from "../templates/InterimResultTemplate";

const InterimResult = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;
  return <InterimResultTemplate clubMatchID={club_match_id} />;
};

export default InterimResult;
