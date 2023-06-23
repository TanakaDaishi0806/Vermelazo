import React from "react";
import { Grid, TextField } from "@mui/material";

import { CreateTeamInfo } from "../type/velmelazo";
import Header from "../components/Header";
import BaseButton from "../parts/BaseButton";

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
      <Header headertext={{ text: "Admin Page" }} />
      <Grid item xs={12} sx={{ mt: "30px" }}>
        <TextField
          label="＊チーム数（作りたいチーム数を入力してください）"
          value={createTeamInfo.teamNum}
          onChange={createTeamInfo.handleTeamNumChange}
          error={createTeamInfo.teamNumEmpty}
          helperText={
            createTeamInfo.teamNumEmpty ? "数字を入力してください" : ""
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
    </Grid>
  );
};

export default CreateTeamTemplate;
