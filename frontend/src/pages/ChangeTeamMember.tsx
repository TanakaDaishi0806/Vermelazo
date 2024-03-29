import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import ChangeTeamMemberTemplate from "../templates/ChangeTeamMemberTemplate";
import { TeamMember, TeamMemberWithAward } from "../type/velmelazo";

const ChangeTeamMember = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  const { state } = locate;
  const { club_match_id, participant_num } = state;
  const accessToken = localStorage.getItem("accessToken");
  const [teamMemberList, setTeamMemberList] = React.useState<
    TeamMemberWithAward[][]
  >([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/home/team/list/${club_match_id}`, {
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
    navigate("/admin/team/create", {
      state: {
        club_match_id: club_match_id,
        participant_num: participant_num,
      },
    });
  };

  return (
    <div>
      <ChangeTeamMemberTemplate
        teamMemberListInfo={{
          teamMemberList: teamMemberList,
          club_match_id: club_match_id,
          vnum: 0,
          setTeamMemberList: setTeamMemberList,
          handleCreateTeamNaviaget: handleCreateTeamNavigate,
        }}
      />
    </div>
  );
};

export default ChangeTeamMember;
