import React from "react";
import {
  Button,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Grid,
} from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import { ResisterAwardInfo } from "../type/velmelazo";
import SelectInAllUsers from "../components/SelectInAllUsers";

type Props = {
  resisterAwardInfo: ResisterAwardInfo;
};

const ResisterAwardTemplate: React.FC<Props> = ({ resisterAwardInfo }) => {
  return (
    <div>
      <AdminHeader />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{ mb: "100px" }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              color: "#444444",
              fontWeight: "1000",
              pt: "40px",
              pb: "40px",
            }}
          >
            アワード登録
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            label="＊受賞名"
            value={resisterAwardInfo.awardName}
            onChange={resisterAwardInfo.handleAwardNameChange}
            error={resisterAwardInfo.awardNameEmpty}
            helperText={
              resisterAwardInfo.awardNameEmpty ? "受賞名を入力してください" : ""
            }
            sx={{ width: "280px" }}
          />
        </Grid>

        <SelectInAllUsers
          selectInAllUsersInfo={{
            handleSelectAwardUser: resisterAwardInfo.handleSelectAwardUser,
            resisterAwardUser: resisterAwardInfo.resisterAwardUser,
          }}
        />
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (
                !(
                  resisterAwardInfo.awardNameEmpty ||
                  resisterAwardInfo.resisterAwardUser.length === 0
                )
              ) {
                resisterAwardInfo.handleAwardResister();
              } else {
                resisterAwardInfo.setInputError(true);
              }
            }}
            sx={{ mb: "20px", mt: "40px" }}
          >
            登録
          </Button>
        </Grid>
        {resisterAwardInfo.inputError && (
          <Grid item xs={12} sx={{ pt: "20px" }}>
            <Typography variant="body1" style={{ color: "red" }}>
              全て入力してください
            </Typography>
          </Grid>
        )}
      </Grid>
      <AdminFooter footerValue={{ vnum: 2 }} />
    </div>
  );
};

export default ResisterAwardTemplate;
