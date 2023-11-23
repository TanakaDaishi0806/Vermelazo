import React from "react";
import { Button, TextField, Typography, Grid } from "@mui/material";

import { SendMailInfo } from "../type/velmelazo";

type Props = {
  sendMailInfo: SendMailInfo;
};

const SendMailForgetPasswordTemplate: React.FC<Props> = ({ sendMailInfo }) => {
  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              color: "#444444",
              fontWeight: "1000",
              pt: "30px",
              pb: "20px",
            }}
          >
            パスワード再設定
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        {sendMailInfo.inputError && (
          <Grid item xs={12} sx={{ pt: "100px", pl: "15px", pb: "5px" }}>
            <Typography variant="body1" style={{ color: "red" }}>
              入力に誤りがあります。正しく入力してください。
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} sx={{ mt: "50px" }}>
          <TextField
            label="＊学籍番号"
            value={sendMailInfo.student_id}
            onChange={sendMailInfo.handleStudent_idChange}
            error={sendMailInfo.student_idError}
            helperText={
              sendMailInfo.student_idError
                ? "正しい学籍番号を入力してください"
                : ""
            }
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <TextField
            label="*メールアドレス"
            value={sendMailInfo.mailaddress}
            onChange={sendMailInfo.handleMailaddressChange}
            error={sendMailInfo.mailaddressEmpty}
            helperText={
              sendMailInfo.mailaddressEmpty
                ? "メールアドレスを入力してください"
                : ""
            }
          />
        </Grid>
      </Grid>
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
                  sendMailInfo.student_idError ||
                  sendMailInfo.mailaddressEmpty ||
                  sendMailInfo.allEmptyError
                )
              ) {
                sendMailInfo.handleSendMail();
              } else {
                sendMailInfo.setInputError(true);
              }
            }}
            sx={{ mt: "20px", mb: "50px", width: "225px", height: "60px" }}
          >
            再設定メールを送信
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SendMailForgetPasswordTemplate;
