import { useLocation } from "react-router-dom";

import ResisterOFMomTemplate from "../templates/ResisterOFMomTemplate";

const ResisterOFMom = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;
  return <ResisterOFMomTemplate clubMatchID={club_match_id} />;
};

export default ResisterOFMom;
