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
  Backdrop,
  Typography,
} from "@mui/material";

import { TeamMemberListInfo } from "../type/velmelazo";
import { teamNameData } from "../data/teamNameData";

type Props = {
  teamMemberListInfo: TeamMemberListInfo;
};

const HomeTeamMemberList: React.FC<Props> = ({ teamMemberListInfo }) => {
  const [length, setLength] = useState(1);
  const [columnCount, setColumnCount] = useState(1);
  const [openMemberIndex, setOpenMemberIndex] = useState(-1);

  useEffect(() => {
    setLength(teamMemberListInfo.teamMemberList.length);
    let newColumnCount = 12 / length;
    if (newColumnCount < 3) {
      newColumnCount = 4.0;
    }
    setColumnCount(newColumnCount);
  }, [teamMemberListInfo.teamMemberList]);

  return (
    <Grid container justifyContent="left" sx={{ mb: "200px" }}>
      {teamMemberListInfo.teamMemberList.map((row, rowIndex) => (
        <Grid item xs={columnCount} key={rowIndex}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{ mt: "60px" }}
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
                          <TableCell
                            onClick={() => {
                              const index = memberIndex + 1000 * rowIndex;
                              if (openMemberIndex === index) {
                                setOpenMemberIndex(-1); // 既に開いている場合は閉じる
                              } else {
                                setOpenMemberIndex(index); // クリックしたメンバーの情報を開く
                              }
                            }}
                          >
                            {member.name}
                          </TableCell>
                          {openMemberIndex ===
                            memberIndex + 1000 * rowIndex && (
                            <Backdrop
                              sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 2,
                                bgcolor: "rgba(10, 10, 10, 0.1)",
                              }}
                              open={true}
                              onClick={() => {
                                const index = memberIndex + 1000 * rowIndex;
                                if (openMemberIndex === index) {
                                  setOpenMemberIndex(-1); // 既に開いている場合は閉じる
                                } else {
                                  setOpenMemberIndex(index); // クリックしたメンバーの情報を開く
                                }
                              }}
                            >
                              <Grid
                                container
                                alignItems="center"
                                justifyContent="center"
                                direction="column"
                                sx={{
                                  bgcolor: "white",
                                  width: "60%",
                                  p: "10px",
                                  color: "black",
                                }}
                              >
                                <Grid item xs={12}>
                                  <Typography
                                    sx={{
                                      fontsize: "10px",
                                      borderBottom: "1px solid #333",
                                      px: "20px",
                                      py: "10px",
                                    }}
                                  >
                                    {member.furigana}
                                  </Typography>
                                  {member.position === 1 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      GK
                                    </Typography>
                                  )}
                                  {member.position === 2 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      DF
                                    </Typography>
                                  )}
                                  {member.position === 3 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      OF
                                    </Typography>
                                  )}
                                  {member.experience === 0 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      未経験
                                    </Typography>
                                  )}
                                  {member.experience === 1 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      小・中まで
                                    </Typography>
                                  )}
                                  {member.experience === 2 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      高校まで
                                    </Typography>
                                  )}
                                  {member.experience === 3 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      大学でも
                                    </Typography>
                                  )}
                                </Grid>
                              </Grid>
                            </Backdrop>
                          )}
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

export default HomeTeamMemberList;
