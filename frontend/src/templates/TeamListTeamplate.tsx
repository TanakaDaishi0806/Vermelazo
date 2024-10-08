import React from "react";

import HomeTeamMemberList from "../components/HomeTeamMemberList";
import { TeamMemberListInfo } from "../type/velmelazo";
import Header from "../components/Header";
import HomeFooter from "../components/HomeFooter";
import Maintenance from "../parts/Maintenance";

type Props = {
  teamMemberListInfo: TeamMemberListInfo;
};

const TeamListTeamplate: React.FC<Props> = ({ teamMemberListInfo }) => {
  return (
    <div>
      <Maintenance />
      <Header headertext={{ text: "My Page" }} />
      <HomeTeamMemberList teamMemberListInfo={teamMemberListInfo} />
      <HomeFooter footerValue={{ vnum: teamMemberListInfo.vnum }} />
    </div>
  );
};

export default TeamListTeamplate;
