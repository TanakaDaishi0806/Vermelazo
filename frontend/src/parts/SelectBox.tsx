import React from "react";
import { useState } from "react";

import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { TeamSelectBoxInfo } from "../type/velmelazo";
import { teamNameData } from "../data/teamNameData";

type Props = {
  teamSelectBoxInfo: TeamSelectBoxInfo;
};

const SelectBox: React.FC<Props> = ({ teamSelectBoxInfo }) => {
  const teamNameList = [...teamNameData.slice(0, teamSelectBoxInfo.teamNum)];

  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Team
      </InputLabel>
      <NativeSelect
        value={teamSelectBoxInfo.defaultNum}
        onChange={teamSelectBoxInfo.handleTeamNameSideChange}
        inputProps={{
          name: "team",
          id: "uncontrolled-native",
        }}
      >
        <option aria-label="None" value="" />
        {teamNameList.map((teamName, index) => (
          <option value={index} key={index}>
            {teamName}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SelectBox;
