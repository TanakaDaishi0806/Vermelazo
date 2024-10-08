import React from "react";

import HomeTeamMemberList from "../components/HomeTeamMemberList";
import { TeamMemberListInfo } from "../type/velmelazo";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";

type Props = {
  teamMemberListInfo: TeamMemberListInfo;
};

const AdminTeamListTeamplate: React.FC<Props> = ({ teamMemberListInfo }) => {
  return (
    <div>
      <Maintenance />
      <AdminHeader />
      <HomeTeamMemberList teamMemberListInfo={teamMemberListInfo} />
      <AdminFooter footerValue={{ vnum: 1 }} />
    </div>
  );
};

export default AdminTeamListTeamplate;
