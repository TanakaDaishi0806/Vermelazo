import { Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BaseButton from "../parts/BaseButton";

const SendMailMessageTemplate = () => {
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
            入力されたメールアドレスにパスワード再設定のＵＲＬを送りました。
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <BaseButton
            baseButton={{
              buttonText: "ログインページへ",
              onClick: () => {
                navigate("/");
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

export default SendMailMessageTemplate;
