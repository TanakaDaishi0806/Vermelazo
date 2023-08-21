import React from "react";
import { Grid, Typography } from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import { AddMatchResultInfo } from "../type/velmelazo";
import AddScore from "../components/AddScore";
import SelectPointGetter from "../components/SelectPointGetter";
import BaseButton from "../parts/BaseButton";
import AdminFooter from "../components/AdminFooter";

type Props = {
  addMatchResultInfo: AddMatchResultInfo;
};

const AddMatchResultTemplate: React.FC<Props> = ({ addMatchResultInfo }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <AdminHeader />
      <AddScore
        addScoreInfo={{
          club_match_id: addMatchResultInfo.club_match_id,
          match_id: addMatchResultInfo.match_id,
          team_id_a: addMatchResultInfo.team_id_a,
          team_id_b: addMatchResultInfo.team_id_b,
          team_name_a: addMatchResultInfo.team_name_a,
          team_name_b: addMatchResultInfo.team_name_b,
          score_a: addMatchResultInfo.score_a,
          score_b: addMatchResultInfo.score_b,
          handleScoreAChange: addMatchResultInfo.handleScoreAChange,
          handleScoreBChange: addMatchResultInfo.handleScoreBChange,
        }}
      />
      <SelectPointGetter
        selectPointGetterInfo={{
          teamAMember: addMatchResultInfo.teamAMember,
          teamBMember: addMatchResultInfo.teamBMember,
          pointGetterA: addMatchResultInfo.pointGetterA,
          pointGetterB: addMatchResultInfo.pointGetterB,
          pointA: addMatchResultInfo.pointA,
          pointB: addMatchResultInfo.pointB,
          handlePlusPointGetterAChange:
            addMatchResultInfo.handlePlusPointGetterAChange,
          handlePlusPointGetterBChange:
            addMatchResultInfo.handlePlusPointGetterBChange,
          handleMinusPointGetterAChange:
            addMatchResultInfo.handleMinusPointGetterAChange,
          handleMinusPointGetterBChange:
            addMatchResultInfo.handleMinusPointGetterBChange,
        }}
      />
      <Grid item xs={12}>
        {addMatchResultInfo.submitError && (
          <Typography variant="body1" style={{ color: "red" }}>
            得点と得点者の数が合いません。
          </Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        <BaseButton
          baseButton={{
            buttonText: "登録",
            onClick: addMatchResultInfo.handlesubmit,
            width: "150px",
            height: "50px",
            mt: "30px",
            mb: "100px",
          }}
        />
      </Grid>
      <AdminFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default AddMatchResultTemplate;
