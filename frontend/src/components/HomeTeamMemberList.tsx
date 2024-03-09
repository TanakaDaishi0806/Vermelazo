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
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

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
    <Grid container justifyContent="center" sx={{ mb: "200px" }}>
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
                            sx={{ fontSize: "10px" }}
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
                                  {member.grade === 1 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      学年：1年
                                    </Typography>
                                  )}
                                  {member.grade === 2 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      学年：2年
                                    </Typography>
                                  )}
                                  {member.grade === 3 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      学年：3年
                                    </Typography>
                                  )}
                                  {member.grade === 4 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      学年：4年
                                    </Typography>
                                  )}
                                  {member.grade === 5 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      学年：修士1年
                                    </Typography>
                                  )}
                                  {member.grade === 6 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      学年：修士2年
                                    </Typography>
                                  )}
                                  {member.position === 1 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      ポジション：GK
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
                                      ポジション：DF
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
                                      ポジション：OF
                                    </Typography>
                                  )}
                                  {member.experience === 0 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      経験歴：未経験
                                    </Typography>
                                  )}
                                  {member.experience === 1 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      経験歴：小・中まで
                                    </Typography>
                                  )}
                                  {member.experience === 2 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      経験歴：高校まで
                                    </Typography>
                                  )}
                                  {member.experience === 3 && (
                                    <Typography
                                      sx={{
                                        fontsize: "10px",
                                        borderBottom: "1px solid #333",
                                        px: "20px",
                                        py: "10px",
                                      }}
                                    >
                                      経験歴：大学でも
                                    </Typography>
                                  )}
                                  {member.award_num !== 0 && (
                                    <Grid
                                      item
                                      xs={12}
                                      container
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      {Array.from({
                                        length: member.award_num,
                                      }).map((_, index) => (
                                        <WorkspacePremiumIcon
                                          key={index}
                                          sx={{
                                            marginRight: "2px",
                                            color: "#2196F3",
                                            pl: "3px",
                                            mt: "10px",
                                          }}
                                        />
                                      ))}
                                    </Grid>
                                  )}
                                  {member.award_num === 0 && (
                                    <WorkspacePremiumIcon
                                      sx={{
                                        marginRight: "2px",
                                        color: "white",
                                        px: "20px",
                                        mt: "10px",
                                      }}
                                    />
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
