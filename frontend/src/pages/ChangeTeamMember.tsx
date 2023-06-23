import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import ChangeTeamMemberTemplate from "../templates/ChangeTeamMemberTemplate";
import { TeamMember } from "../type/velmelazo";
import TeamMemberList from "../components/TeamMemberList";

const ChangeTeamMember = () => {
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;
  const accessToken = localStorage.getItem("accessToken");
  const [teamMemberList, setTeamMemberList] = React.useState<TeamMember[][]>(
    []
  );
  React.useEffect(() => {
    axios
      .get(`http://localhost:18000/home/team/list/${club_match_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTeamMemberList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChangeTeamMemberTemplate
        teamMemberListInfo={{
          teamMemberList: teamMemberList,
          club_match_id: club_match_id,
          setTeamMemberList: setTeamMemberList,
        }}
      />
    </div>
  );
};

export default ChangeTeamMember;
