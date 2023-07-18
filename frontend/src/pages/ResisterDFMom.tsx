import { useLocation } from "react-router-dom";

import ResisterDFMomTemplate from "../templates/ResisterDFMomTemplate";

const ResisterDFMom = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;
  return <ResisterDFMomTemplate clubMatchID={club_match_id} />;
};

export default ResisterDFMom;
