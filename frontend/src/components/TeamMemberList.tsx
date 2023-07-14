import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { TeamMemberListInfo } from "../type/velmelazo";
import { teamNameData } from "../data/teamNameData";

type Props = {
  teamMemberListInfo: TeamMemberListInfo;
};

const TeamMemberList: React.FC<Props> = ({ teamMemberListInfo }) => {
  const [length, setLength] = useState(1);
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    setLength(teamMemberListInfo.teamMemberList.length);
    const newColumnCount = Math.max(12 / length, 3);
    setColumnCount(newColumnCount);
  }, [teamMemberListInfo.teamMemberList]);

  return (
    <Grid container justifyContent="center">
      {teamMemberListInfo.teamMemberList.map((row, rowIndex) => (
        <Grid item xs={columnCount} key={rowIndex}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid item xs={10} sx={{ mt: "30px" }}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ py: "10px" }}>
                        {teamNameData[rowIndex]}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row &&
                      row.map((member, memberIndex) => (
                        <TableRow
                          key={memberIndex}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontSize: "13px", py: "10px" }}
                          >
                            {member.name}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamMemberList;
