import { Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BaseButton from "../parts/BaseButton";

const NotPasswordResetMessageTemplate = () => {
  const navigate = useNavigate();
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
            sx={{
              color: "#444444",
              fontWeight: "700",
              pt: "30px",
              pb: "20px",
            }}
          >
            パスワードの再設定に失敗しました。トークンの有効期限が切れている可能性があるため再度、パスワード再設定メールの送信を行ってください。
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <BaseButton
            baseButton={{
              buttonText: "メール送信ページへ",
              onClick: () => {
                navigate("/forgetpassword/sendmail");
              },
              width: "200px",
              height: "50px",
              mt: "20px",
              mb: "50px",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default NotPasswordResetMessageTemplate;
