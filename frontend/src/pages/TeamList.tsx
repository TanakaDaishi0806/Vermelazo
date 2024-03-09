import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { TeamMember, TeamMemberWithAward } from "../type/velmelazo";
import TeamListTeamplate from "../templates/TeamListTeamplate";

// TeamMemberWithAwardからTeamMemberへの変換関数
const convertToTeamMember = (
  teamMemberWithAward: TeamMemberWithAward
): TeamMember => {
  const { award_num, ...rest } = teamMemberWithAward; // award_num以外のフィールドを取り出す
  return rest as TeamMember; // 取り出したフィールドをTeamMemberに変換
};

const TeamList = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  const { state } = locate;
  const { club_match_id, vnum } = state;
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
        console.log("aaaaaaa");
        console.log(response.data);
        setTeamMemberList(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
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
      <TeamListTeamplate
        teamMemberListInfo={{
          teamMemberList: teamMemberList,
          club_match_id: club_match_id,
          vnum: vnum,
          setTeamMemberList: setTeamMemberList,
          handleCreateTeamNaviaget: handleCreateTeamNavigate,
        }}
      />
    </div>
  );
};

export default TeamList;
