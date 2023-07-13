import { useLocation } from "react-router-dom";

import ResisterGKMomTemplate from "../templates/ResisterGKMomTemplate";

const ResisterGKMom = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;
  return <ResisterGKMomTemplate clubMatchID={club_match_id} />;
};

export default ResisterGKMom;
