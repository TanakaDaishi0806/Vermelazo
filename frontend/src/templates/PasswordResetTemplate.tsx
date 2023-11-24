import React from "react";
import { Button, TextField, Typography, Grid } from "@mui/material";

import { ChangeAdminPassword } from "../type/velmelazo";

type Props = {
  changeAdminPassword: ChangeAdminPassword;
};

const PasswordResetTemplate: React.FC<Props> = ({ changeAdminPassword }) => {
  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        {changeAdminPassword.inputError && (
          <Grid item xs={12} sx={{ pt: "30px", pl: "15px", pb: "5px" }}>
            <Typography variant="body1" style={{ color: "red" }}>
              入力に誤りがあります。正しく入力してください。
            </Typography>
          </Grid>
        )}

        <br />
        <Grid item xs={12} sx={{ mt: "30px" }}>
          <TextField
            label="＊変更後のパスワード(8文字以上)"
            type="password"
            value={changeAdminPassword.password}
            onChange={changeAdminPassword.handlePasswordChange}
            error={changeAdminPassword.passwordLengthError}
            helperText={
              changeAdminPassword.passwordLengthError
                ? "8文字以上のパスワードを入力してください"
                : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <TextField
            label="＊変更後のパスワード（確認用）"
            type="password"
            value={changeAdminPassword.confirmPassword}
            onChange={changeAdminPassword.handleConfirmPasswordChange}
            error={changeAdminPassword.passwordError}
            helperText={
              changeAdminPassword.passwordError
                ? "パスワードが一致しません"
                : ""
            }
          />
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
                  changeAdminPassword.passwordError ||
                  changeAdminPassword.passwordLengthError ||
                  changeAdminPassword.confirmPasswordEmpty ||
                  changeAdminPassword.allEmptyError
                )
              ) {
                changeAdminPassword.handleChangeAdminPassword();
              } else {
                changeAdminPassword.setInputError(true);
              }
            }}
            sx={{ mb: "50px", mt: "20px", width: "225px", height: "60px" }}
          >
            変更
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PasswordResetTemplate;
