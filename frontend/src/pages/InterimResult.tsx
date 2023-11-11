import { useLocation } from "react-router-dom";

import InterimResultTemplate from "../templates/InterimResultTemplate";

const InterimResult = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, vnum } = state;
  return (
    <InterimResultTemplate
      interimResultInfo={{ club_match_id: club_match_id, vnum: vnum }}
    />
  );
};

export default InterimResult;
