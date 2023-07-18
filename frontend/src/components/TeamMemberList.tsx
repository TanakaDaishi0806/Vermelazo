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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
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
            sx={{ mt: "30px" }}
          >
            <Grid item xs={10}>
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
                          <Accordion>
                            <AccordionSummary
                              aria-controls={member.name}
                              sx={{ borderBottom: "1px solid #888888" }}
                            >
                              <Typography>{member.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                borderBottom: "1px solid #888888",
                                bgcolor: "#ffffff",
                                color: "#2196F3",
                              }}
                            >
                              <Typography sx={{ fontsize: "10px" }}>
                                {member.furigana}
                              </Typography>
                              {member.position === 1 && (
                                <Typography sx={{ fontsize: "10px" }}>
                                  GK
                                </Typography>
                              )}
                              {member.position === 2 && (
                                <Typography sx={{ fontsize: "10px" }}>
                                  DF
                                </Typography>
                              )}
                              {member.position === 3 && (
                                <Typography sx={{ fontsize: "10px" }}>
                                  OF
                                </Typography>
                              )}
                              {member.experience === 0 && (
                                <Typography sx={{ fontsize: "10px" }}>
                                  未経験
                                </Typography>
                              )}
                              {member.experience === 1 && (
                                <Typography sx={{ fontsize: "10px" }}>
                                  小・中まで
                                </Typography>
                              )}
                              {member.experience === 2 && (
                                <Typography sx={{ fontsize: "10px" }}>
                                  高校まで
                                </Typography>
                              )}
                              {member.experience === 3 && (
                                <Typography sx={{ fontsize: "10px" }}>
                                  大学
                                </Typography>
                              )}
                            </AccordionDetails>
                          </Accordion>
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
