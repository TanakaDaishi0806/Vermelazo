import { Box, Grid, Button, TextField, Typography } from "@mui/material";
import React from "react";

import { LoginInfo } from "../type/velmelazo";
import BaseButton from "../parts/BaseButton";

type Props = {
  loginInfo: LoginInfo;
};

const AdminLoginTemplate: React.FC<Props> = ({ loginInfo }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "rgba(200, 200, 200, 0.4)",
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
            sx={{ color: "white", fontWeight: "1000", pt: "150px", pb: "50px" }}
          >
            Vermelazo
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
                value={loginInfo.studentID}
                onChange={loginInfo.handleStudentIDChange}
                error={loginInfo.studentIDEmpty}
                helperText={
                  loginInfo.studentIDEmpty ? "学籍番号を入力してください" : ""
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
                        loginInfo.studentIDEmpty ||
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
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default AdminLoginTemplate;
