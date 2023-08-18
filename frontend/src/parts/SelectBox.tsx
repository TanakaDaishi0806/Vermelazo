import React from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { TeamSelectBoxInfo } from "../type/velmelazo";
import { teamNameData } from "../data/teamNameData";

type Props = {
  teamSelectBoxInfo: TeamSelectBoxInfo;
};

const SelectBox: React.FC<Props> = ({ teamSelectBoxInfo }) => {
  const teamNameList = [...teamNameData.slice(0, teamSelectBoxInfo.teamNum)];

  return (
    <FormControl>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Team
      </InputLabel>
      <Select
        value={teamSelectBoxInfo.defaultNum}
        onChange={teamSelectBoxInfo.handleTeamNameSideChange}
        inputProps={{
          name: "team",
          id: "uncontrolled-native",
        }}
        sx={{ width: "95px", fontSize: "13px" }} // セレクトボックス全体の幅を調整
        MenuProps={{
          PaperProps: {
            style: { maxHeight: 200, width: "95px" }, // ドロップダウンのスタイルを調整
          },
        }}
      >
        <MenuItem
          aria-label="None"
          value=""
          style={{ fontSize: "15px", width: "100%" }} // 選択肢のスタイルを調整
        />
        {teamNameList.map((teamName, index) => (
          <MenuItem
            value={index}
            key={index}
            style={{ fontSize: "15px", width: "100%" }} // 選択肢のスタイルを調整
          >
            {teamName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
