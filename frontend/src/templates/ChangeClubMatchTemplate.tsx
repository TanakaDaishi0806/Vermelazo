import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import Calendar from "../components/Calendar";
import BaseButton from "../parts/BaseButton";
import { ChangeClubMatchInfo } from "../type/velmelazo";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

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
        <Maintenance />
        <AdminHeader />
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
        <Grid item xs={12} sx={{ mt: "25px", width: "225px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">*部内戦の形式</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={changeClubMatchInfo.type}
              label="*type"
              onChange={changeClubMatchInfo.handleTypeChange}
            >
              <MenuItem value={1}>予選・決勝トーナメント</MenuItem>
              <MenuItem value={0}>総当たり</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ mt: "25px" }}>
          <TextField
            label="＊獲得ポイントの倍数"
            value={changeClubMatchInfo.pointTimes}
            onChange={changeClubMatchInfo.handlePointTimesChange}
            error={changeClubMatchInfo.pointTimesEmpty}
            helperText={
              changeClubMatchInfo.pointTimesEmpty
                ? "1以上の自然数を入力してください"
                : ""
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
                    changeClubMatchInfo.titleEmpty ||
                    changeClubMatchInfo.pointTimesEmpty
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
        <AdminFooter footerValue={{ vnum: 0 }} />
      </Grid>
    </div>
  );
};

export default ChangeClubMatchTemplate;
