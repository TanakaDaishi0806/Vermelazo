import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import ChangeTeamMemberTemplate from "../templates/ChangeTeamMemberTemplate";
import { TeamMember } from "../type/velmelazo";

const ChangeTeamMember = () => {
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
          navigate("/adminlogin");
        }
      });
  }, [accessToken, club_match_id, navigate]);

  const handleCreateTeamNavigate = () => {
    navigate("/admin/create/team", {
      state: {
        club_match_id: club_match_id,
      },
    });
  };

  return (
    <div>
      <ChangeTeamMemberTemplate
        teamMemberListInfo={{
          teamMemberList: teamMemberList,
          club_match_id: club_match_id,
          setTeamMemberList: setTeamMemberList,
          handleCreateTeamNaviaget: handleCreateTeamNavigate,
        }}
      />
    </div>
  );
};

export default ChangeTeamMember;
