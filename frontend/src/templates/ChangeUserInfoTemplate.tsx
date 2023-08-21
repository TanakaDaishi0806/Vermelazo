import React from "react";
import {
  Button,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Grid,
} from "@mui/material";

import { ChangeUserInfo } from "../type/velmelazo";
import Header from "../components/Header";
import HomeFooter from "../components/HomeFooter";

type Props = {
  changeUserInfo: ChangeUserInfo;
};

const grades = [
  { value: 1, label: "1年" },
  { value: 2, label: "2年" },
  { value: 3, label: "3年" },
  { value: 4, label: "4年" },
  { value: 5, label: "M1" },
  { value: 6, label: "M2" },
];

const positions = [
  { value: 1, label: "ゴールキーパー" },
  { value: 2, label: "ディフェンダー" },
  { value: 3, label: "オフェンス" },
];

const experiences = [
  { value: 0, label: "一度もサッカー部に入ったことがない" },
  { value: 1, label: "小学校または中学校までやっていた" },
  { value: 2, label: "高校までやっていた" },
  { value: 3, label: "現在サッカー部やフットサル部でやっている" },
];

const ChangeUserInfoTemplate: React.FC<Props> = ({ changeUserInfo }) => {
  return (
    <div>
      <Header headertext={{ text: "My Page" }} />
      <Grid
        container
        alignItems="left"
        justifyContent="center"
        direction="column"
      >
        {changeUserInfo.inputError && (
          <Grid item xs={12} sx={{ pt: "100px", pl: "15px", pb: "5px" }}>
            <Typography variant="body1" style={{ color: "red" }}>
              入力に誤りがあります。正しく入力してください。
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sx={{ pl: "15px", pt: "50px" }}>
          <TextField
            label="＊名前"
            value={changeUserInfo.name}
            onChange={changeUserInfo.handleNameChange}
            error={changeUserInfo.nameEmpty}
            helperText={
              changeUserInfo.nameEmpty ? "名前を入力してください" : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="＊ふりがな（ひらがな）"
            value={changeUserInfo.furigana}
            onChange={changeUserInfo.handleFuriganaChange}
            error={changeUserInfo.furiganaEmpty}
            helperText={
              changeUserInfo.furiganaEmpty ? "ふりがなを入力してください" : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="＊学籍番号"
            value={changeUserInfo.student_id}
            onChange={changeUserInfo.handleStudent_idChange}
            error={changeUserInfo.student_idError}
            helperText={
              changeUserInfo.student_idError
                ? "正しい学籍番号を入力してください"
                : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="*メールアドレス"
            value={changeUserInfo.mailaddress}
            onChange={changeUserInfo.handleMailaddressChange}
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="grade-select-standard-label">＊学年</InputLabel>
            <Select
              labelId="grade-select-standard-label"
              id="grade-select-standard"
              value={changeUserInfo.grade.toString()}
              onChange={changeUserInfo.handleGradeChange}
              label="grade"
            >
              {grades.map((gd) => (
                <MenuItem key={gd.value} value={gd.value}>
                  {gd.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="position-select-standard-label">
              ＊ポジション
            </InputLabel>
            <Select
              labelId="position-select-standard-label"
              id="position-select-standard"
              value={changeUserInfo.position.toString()}
              onChange={changeUserInfo.handlePositionChange}
              label="position"
            >
              {positions.map((pt) => (
                <MenuItem key={pt.value} value={pt.value}>
                  {pt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <FormControl>
            <FormLabel id="experience-radio-buttons-group-label">
              サッカー歴
            </FormLabel>
            <RadioGroup
              aria-labelledby="experience-radio-buttons-group-label"
              defaultValue={0}
              name="experience-radio-buttons-group"
              value={changeUserInfo.experience}
              onChange={changeUserInfo.handleExperienceChange}
            >
              {experiences.map((ep) => (
                <FormControlLabel
                  key={ep.value}
                  value={ep.value}
                  control={<Radio />}
                  label={ep.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (
                !(
                  changeUserInfo.nameEmpty ||
                  changeUserInfo.furiganaEmpty ||
                  changeUserInfo.student_idError ||
                  changeUserInfo.allEmptyError
                )
              ) {
                changeUserInfo.handleChangeUserInfo();
              } else {
                changeUserInfo.setInputError(true);
              }
            }}
            sx={{ mb: "100px", mt: "30px" }}
          >
            変更
          </Button>
        </Grid>
      </Grid>
      <HomeFooter footerValue={{ vnum: 3 }} />
    </div>
  );
};

export default ChangeUserInfoTemplate;
