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

import { NewAccountInfo } from "../type/velmelazo";
import Maintenance from "../parts/Maintenance";

type Props = {
  newAccountInfo: NewAccountInfo;
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
  { value: 2, label: "ディフェンダー（守備）" },
  { value: 3, label: "オフェンス（攻撃）" },
];

const experiences = [
  { value: 0, label: "一度もサッカー部に入ったことがない" },
  { value: 1, label: "小学校または中学校までやっていた" },
  { value: 2, label: "高校までやっていた" },
  { value: 3, label: "大学でサッカー・フットサル部でやっている" },
];

const NewAccountCreateTemplate: React.FC<Props> = ({ newAccountInfo }) => {
  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Maintenance />
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              color: "#444444",
              fontWeight: "1000",
              pt: "30px",
              pb: "20px",
            }}
          >
            Vermelazo
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              color: "#444444",
              fontWeight: "800",
              pb: "50px",
            }}
          >
            メンバー登録
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="left"
        justifyContent="center"
        direction="column"
      >
        {newAccountInfo.inputError && (
          <Grid item xs={12} sx={{ pt: "100px", pl: "15px", pb: "5px" }}>
            <Typography variant="body1" style={{ color: "red" }}>
              入力に誤りがあります。正しく入力してください。
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="＊名前（記入例：佐藤太郎）"
            value={newAccountInfo.name}
            onChange={newAccountInfo.handleNameChange}
            error={newAccountInfo.nameEmpty}
            helperText={
              newAccountInfo.nameEmpty ? "名前を入力してください" : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="＊ふりがな（記入例：さとうたろう）"
            value={newAccountInfo.furigana}
            onChange={newAccountInfo.handleFuriganaChange}
            error={newAccountInfo.furiganaEmpty}
            helperText={
              newAccountInfo.furiganaEmpty ? "ふりがなを入力してください" : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="＊学籍番号"
            value={newAccountInfo.student_id}
            onChange={newAccountInfo.handleStudent_idChange}
            error={newAccountInfo.student_idError}
            helperText={
              newAccountInfo.student_idError
                ? "正しい学籍番号を入力してください"
                : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="＊パスワード(8文字以上)"
            type="password"
            value={newAccountInfo.password}
            onChange={newAccountInfo.handlePasswordChange}
            error={newAccountInfo.passwordLengthError}
            helperText={
              newAccountInfo.passwordLengthError
                ? "8文字以上のパスワードを入力してください"
                : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="＊パスワード（確認用）"
            type="password"
            value={newAccountInfo.confirmPassword}
            onChange={newAccountInfo.handleConfirmPasswordChange}
            error={newAccountInfo.passwordError}
            helperText={
              newAccountInfo.passwordError ? "パスワードが一致しません" : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <TextField
            label="*メールアドレス"
            value={newAccountInfo.mailaddress}
            onChange={newAccountInfo.handleMailaddressChange}
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ pl: "15px" }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="grade-select-standard-label">＊学年</InputLabel>
            <Select
              labelId="grade-select-standard-label"
              id="grade-select-standard"
              value={newAccountInfo.grade.toString()}
              onChange={newAccountInfo.handleGradeChange}
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
              value={newAccountInfo.position.toString()}
              onChange={newAccountInfo.handlePositionChange}
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
              value={newAccountInfo.experience}
              onChange={newAccountInfo.handleExperienceChange}
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
                  newAccountInfo.passwordError ||
                  newAccountInfo.nameEmpty ||
                  newAccountInfo.furiganaEmpty ||
                  newAccountInfo.student_idError ||
                  newAccountInfo.passwordLengthError ||
                  newAccountInfo.confirmPasswordEmpty ||
                  newAccountInfo.allEmptyError
                )
              ) {
                newAccountInfo.handleNewAccountCreate();
              } else {
                newAccountInfo.setInputError(true);
              }
            }}
            sx={{ mb: "50px" }}
          >
            登録
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewAccountCreateTemplate;
