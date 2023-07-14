import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { TeamMember } from "../type/velmelazo";
import TeamListTeamplate from "../templates/TeamListTeamplate";
import ToHomeButton from "../parts/ToHomeButton";

const TeamList = () => {
  const locate = useLocation();
  const navigate = useNavigate();
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
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  return (
    <div>
      <TeamListTeamplate
        teamMemberListInfo={{
          teamMemberList: teamMemberList,
          club_match_id: club_match_id,
          setTeamMemberList: setTeamMemberList,
        }}
      />
      <ToHomeButton homeUrl="/home" />
    </div>
  );
};

export default TeamList;
