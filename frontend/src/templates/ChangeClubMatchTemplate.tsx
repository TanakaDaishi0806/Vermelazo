import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

import Header from "../components/Header";
import Calendar from "../components/Calendar";
import BaseButton from "../parts/BaseButton";
import { ChangeClubMatchInfo } from "../type/velmelazo";

type Props = {
  changeClubMatchInfo: ChangeClubMatchInfo;
};

const ChangeClubMatchTemplate: React.FC<Props> = ({ changeClubMatchInfo }) => {
  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Header headertext={{ text: "Admin Page" }} />
        {changeClubMatchInfo.inputError && (
          <Grid item xs={12} sx={{ pl: "15px", pb: "5px", pt: "30px" }}>
            <Typography variant="body1" style={{ color: "red" }}>
              入力に誤りがあります。正しく入力してください。
            </Typography>
          </Grid>
        )}
        <Grid item sx={{ mt: "50px" }}>
          <Calendar
            dateValue={{
              date: changeClubMatchInfo.date,
              calenderText: "部内戦の日付",
              handleDateChange: changeClubMatchInfo.handleDateChange,
            }}
          />
        </Grid>

        <Calendar
          dateValue={{
            date: changeClubMatchInfo.voteDate,
            calenderText: "参加投票の締め切り",
            handleDateChange: changeClubMatchInfo.handleVoteDateChange,
          }}
        />

        <Grid item xs={12}>
          <TextField
            label="＊タイトル"
            value={changeClubMatchInfo.title}
            onChange={changeClubMatchInfo.handleTitleChange}
            error={changeClubMatchInfo.titleEmpty}
            helperText={
              changeClubMatchInfo.titleEmpty ? "タイトルを入力してください" : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <BaseButton
            baseButton={{
              buttonText: "内容を変更",
              onClick: () => {
                if (
                  !(
                    changeClubMatchInfo.dateEmpty ||
                    changeClubMatchInfo.voteDateEmpty ||
                    changeClubMatchInfo.titleEmpty
                  )
                ) {
                  changeClubMatchInfo.handleChangeDateSubmit();
                } else {
                  changeClubMatchInfo.setInputError(true);
                }
              },
              width: "120px",
              height: "50px",
              mt: "20px",
              mb: "",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangeClubMatchTemplate;
