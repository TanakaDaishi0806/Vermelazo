import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { LoginInfo } from "../type/velmelazo";
import BaseButton from "../parts/BaseButton";
import Maintenance from "../parts/Maintenance";

type Props = {
  loginInfo: LoginInfo;
};

const AdminLoginTemplate: React.FC<Props> = ({ loginInfo }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "white",
        //backgroundImage: "linear-gradient(30deg, #eeeeff, #9999aa, #eeeeff)",
      }}
    >
      <Maintenance />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              color: "#333333",
              fontWeight: "1000",
              pt: "100px",
              pb: "10px",
            }}
          >
            Vermelazo
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#444444",
              fontWeight: "800",
              pb: "100px",
              fontsize: "20px",
            }}
          >
            サッカーサークル部内戦管理アプリ
          </Typography>
        </Grid>

        <Box sx={{ bgcolor: "#ffffff", width: "300px", pt: "20px" }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            {loginInfo.inputError && (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: "red", mx: "auto" }}>
                  入力に誤りがあります。正しく入力してください。
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                sx={{ width: "250px" }}
                label="学籍番号"
                value={loginInfo.student_id}
                onChange={loginInfo.handleStudent_idChange}
                error={loginInfo.student_idEmpty}
                helperText={
                  loginInfo.student_idEmpty ? "学籍番号を入力してください" : ""
                }
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                sx={{ width: "250px" }}
                label="パスワード"
                type="password"
                value={loginInfo.password}
                onChange={loginInfo.handlePasswordChange}
                error={loginInfo.passwordEmpty}
                helperText={
                  loginInfo.passwordEmpty ? "パスワードを入力してください" : ""
                }
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <BaseButton
                baseButton={{
                  buttonText: "ログイン",
                  onClick: () => {
                    if (
                      !(
                        loginInfo.student_idEmpty ||
                        loginInfo.passwordEmpty ||
                        loginInfo.allEmptyError
                      )
                    ) {
                      loginInfo.handleLogin();
                    } else {
                      loginInfo.setInputError(true);
                    }
                  },
                  width: "250px",
                  height: "60px",
                  mt: "",
                  mb: "",
                }}
              />
            </Grid>
            <br />
            <Grid item xs={12} sx={{ mb: "20px" }}>
              <Link to="/">ユーザーログイン画面へ</Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default AdminLoginTemplate;
