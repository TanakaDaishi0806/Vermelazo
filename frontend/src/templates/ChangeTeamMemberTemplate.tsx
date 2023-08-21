import React from "react";
import { Grid } from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import TeamMemberList from "../components/TeamMemberList";
import { TeamMemberListInfo } from "../type/velmelazo";
import ChangeTeamMemberCard from "../components/ChangeTeamMemberCard";
import BaseButton from "../parts/BaseButton";
import AdminFooter from "../components/AdminFooter";

type Props = {
  teamMemberListInfo: TeamMemberListInfo;
};

const ChangeTeamMemberTemplate: React.FC<Props> = ({ teamMemberListInfo }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <AdminHeader />
      <TeamMemberList teamMemberListInfo={teamMemberListInfo} />
      <BaseButton
        baseButton={{
          buttonText: "チーム数を変更",
          onClick: teamMemberListInfo.handleCreateTeamNaviaget,
          width: "150px",
          height: "50px",
          mt: "30px",
          mb: "50px",
        }}
      />
      <ChangeTeamMemberCard teamMemberListInfo={teamMemberListInfo} />
      <AdminFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default ChangeTeamMemberTemplate;
