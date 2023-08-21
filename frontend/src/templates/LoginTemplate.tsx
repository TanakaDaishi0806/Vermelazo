import { Link } from "react-router-dom";
import { Box, Grid, Button, TextField, Typography } from "@mui/material";
import React from "react";

import { LoginInfo } from "../type/velmelazo";

type Props = {
  loginInfo: LoginInfo;
};

const LoginTemplate: React.FC<Props> = ({ loginInfo }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "white",
        //backgroundImage: "linear-gradient(30deg, #eeeeff, #9999aa, #eeeeff)",
      }}
    >
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

        <Box
          sx={{
            bgcolor: "white",
            width: "300px",
            pt: "20px",
            pb: "20px",
          }}
        >
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
              <Button
                sx={{ width: "250px", height: "60px", fontSize: "15px" }}
                variant="contained"
                color="primary"
                onClick={() => {
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
                }}
              >
                ログイン
              </Button>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Link to="/newaccountcreate">新規登録</Link>
            </Grid>
            <Grid item xs={12}>
              <Link to="/adminlogin">管理者としてログイン</Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default LoginTemplate;
