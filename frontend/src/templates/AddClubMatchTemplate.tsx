import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

import Header from "../components/Header";
import Calendar from "../components/Calendar";
import BaseButton from "../parts/BaseButton";
import { AddClubMatchInfo } from "../type/velmelazo";

type Props = {
  addClubMatchInfo: AddClubMatchInfo;
};

const AddClubMatchTemplate: React.FC<Props> = ({ addClubMatchInfo }) => {
  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Header headertext={{ text: "Admin Page" }} />
        {addClubMatchInfo.inputError && (
          <Grid item xs={12} sx={{ pl: "15px", pb: "5px", pt: "30px" }}>
            <Typography variant="body1" style={{ color: "red" }}>
              入力に誤りがあります。正しく入力してください。
            </Typography>
          </Grid>
        )}
        <Grid item sx={{ mt: "50px" }}>
          <Calendar
            dateValue={{
              date: addClubMatchInfo.date,
              calenderText: "部内戦の日付",
              handleDateChange: addClubMatchInfo.handleDateChange,
            }}
          />
        </Grid>

        <Calendar
          dateValue={{
            date: addClubMatchInfo.voteDate,
            calenderText: "参加投票の締め切り",
            handleDateChange: addClubMatchInfo.handleVoteDateChange,
          }}
        />

        <Grid item xs={12}>
          <TextField
            label="＊タイトル"
            value={addClubMatchInfo.title}
            onChange={addClubMatchInfo.handleTitleChange}
            error={addClubMatchInfo.titleEmpty}
            helperText={
              addClubMatchInfo.titleEmpty ? "タイトルを入力してください" : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <BaseButton
            baseButton={{
              buttonText: "日程を追加",
              onClick: () => {
                if (
                  !(
                    addClubMatchInfo.dateEmpty ||
                    addClubMatchInfo.titleEmpty ||
                    addClubMatchInfo.allEmptyError
                  )
                ) {
                  addClubMatchInfo.handleDateSubmit();
                } else {
                  addClubMatchInfo.setInputError(true);
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

export default AddClubMatchTemplate;
