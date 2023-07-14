import React from "react";

import TeamMemberList from "../components/TeamMemberList";
import { TeamMemberListInfo } from "../type/velmelazo";
import Header from "../components/Header";
import HomeFooter from "../components/HomeFooter";

type Props = {
  teamMemberListInfo: TeamMemberListInfo;
};

const TeamListTeamplate: React.FC<Props> = ({ teamMemberListInfo }) => {
  return (
    <div>
      <Header headertext={{ text: "My Page" }} />
      <TeamMemberList teamMemberListInfo={teamMemberListInfo} />
      <HomeFooter footerValue={{ vnum: teamMemberListInfo.vnum }} />
    </div>
  );
};

export default TeamListTeamplate;
