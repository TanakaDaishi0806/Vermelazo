import React from "react";
import { Grid, TextField } from "@mui/material";

import { CreateMatchInfo } from "../type/velmelazo";
import AdminHeader from "../components/AdminHeader";
import BaseButton from "../parts/BaseButton";
import AdminFooter from "../components/AdminFooter";

type Props = {
  createMatchInfo: CreateMatchInfo;
};

const CreateMatchTemplate: React.FC<Props> = ({ createMatchInfo }) => {
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
          label="＊試合の総当たりを繰り返す回数"
          value={createMatchInfo.matchNum}
          onChange={createMatchInfo.handleMatchNumChange}
          error={createMatchInfo.matchNumEmpty}
          helperText={
            createMatchInfo.matchNumEmpty ? "数字を入力してください" : ""
          }
        />
      </Grid>
      <Grid item xs={12}>
        <BaseButton
          baseButton={{
            buttonText: "試合作成",
            onClick: () => {
              if (
                !(
                  createMatchInfo.matchNumEmpty || createMatchInfo.allEmptyError
                )
              ) {
                createMatchInfo.handleCreateMatchDataSubmit();
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

export default CreateMatchTemplate;
