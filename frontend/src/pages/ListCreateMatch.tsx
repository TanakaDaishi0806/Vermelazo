import { useLocation, useNavigate } from "react-router-dom";

import ListCreateMatchTemplate from "../templates/ListCreateMatchTemplate";

const ListCreateMatch = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;

  const rightEmptySpace = () => {
    return <div></div>;
  };
  const handleCreateMatchList = () => {
    navigate("/admin/match/create", {
      state: {
        club_match_id: club_match_id,
      },
    });
  };
  const handlehome = () => {
    navigate("/admin", {
      state: {
        club_match_id: club_match_id,
      },
    });
  };

  return (
    <ListCreateMatchTemplate
      changeMatchListInfo={{
        matchListInfo: {
          club_match_id: club_match_id,
          rightSpace: rightEmptySpace,
        },
        handleCreateMatchList: handleCreateMatchList,
        handleHome: handlehome,
      }}
    />
  );
};

export default ListCreateMatch;
