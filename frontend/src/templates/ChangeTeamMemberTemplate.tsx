import React from "react";
import { Grid } from "@mui/material";

import Header from "../components/Header";
import TeamMemberList from "../components/TeamMemberList";
import { TeamMemberListInfo } from "../type/velmelazo";
import ChangeTeamMemberCard from "../components/ChangeTeamMemberCard";
import ToHomeButton from "../parts/ToHomeButton";

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
      <Header headertext={{ text: "Admin Page" }} />
      <TeamMemberList teamMemberListInfo={teamMemberListInfo} />
      <ToHomeButton homeUrl="/admin" />
      <ChangeTeamMemberCard teamMemberListInfo={teamMemberListInfo} />
    </Grid>
  );
};

export default ChangeTeamMemberTemplate;
