import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Calendar from "../components/Calendar";
import BaseButton from "../parts/BaseButton";
import { AddClubMatchInfo } from "../type/velmelazo";
import Maintenance from "../parts/Maintenance";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  addClubMatchInfo: AddClubMatchInfo;
};

const AddClubMatchTemplate: React.FC<Props> = ({ addClubMatchInfo }) => {
  return (
    <div>
      <Maintenance />

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <AdminHeader />
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
        <Grid item xs={12} sx={{ mt: "25px", width: "225px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">*部内戦の形式</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={addClubMatchInfo.type}
              label="*type"
              onChange={addClubMatchInfo.handleTypeChange}
            >
              <MenuItem value={1}>予選・決勝トーナメント</MenuItem>
              <MenuItem value={0}>総当たり</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ mt: "25px" }}>
          <TextField
            label="＊獲得ポイントの倍数"
            value={addClubMatchInfo.pointTimes}
            onChange={addClubMatchInfo.handlePointTimesChange}
            error={addClubMatchInfo.pointTimesEmpty}
            helperText={
              addClubMatchInfo.pointTimesEmpty
                ? "1以上の自然数を入力してください"
                : ""
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
                    addClubMatchInfo.allEmptyError ||
                    addClubMatchInfo.pointTimesEmpty
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
        <AdminFooter footerValue={{ vnum: 0 }} />
      </Grid>
    </div>
  );
};

export default AddClubMatchTemplate;
