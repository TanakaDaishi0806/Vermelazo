import React from "react";
import { Grid, TextField } from "@mui/material";

import { CreateTeamInfo } from "../type/velmelazo";
import AdminHeader from "../components/AdminHeader";
import BaseButton from "../parts/BaseButton";
import AdminFooter from "../components/AdminFooter";

type Props = {
  createTeamInfo: CreateTeamInfo;
};

const CreateTeamTemplate: React.FC<Props> = ({ createTeamInfo }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <AdminHeader />
      <Grid item xs={12} sx={{ mt: "30px" }}>
        <TextField
          label="＊チーム数（作りたいチーム数を入力してください）"
          value={createTeamInfo.teamNum}
          onChange={createTeamInfo.handleTeamNumChange}
          error={createTeamInfo.teamNumEmpty}
          helperText={
            createTeamInfo.teamNumEmpty
              ? "数字を入力してください。また、人数以下のチーム数にしてください。"
              : ""
          }
        />
      </Grid>
      <Grid item xs={12}>
        <BaseButton
          baseButton={{
            buttonText: "チーム作成",
            onClick: () => {
              if (
                !(createTeamInfo.teamNumEmpty || createTeamInfo.allEmptyError)
              ) {
                createTeamInfo.handleCreateTeamDataSubmit();
              }
            },
            width: "120px",
            height: "50px",
            mt: "20px",
            mb: "50px",
          }}
        />
      </Grid>
      <AdminFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default CreateTeamTemplate;
