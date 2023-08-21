import React from "react";
import { Grid, Typography } from "@mui/material";

import Header from "../components/Header";
import HomeFooter from "../components/HomeFooter";
import { UserInfoChange } from "../type/velmelazo";
import BaseButton from "../parts/BaseButton";

type Props = {
  userInfoChange: UserInfoChange;
};

const ListUserInfoTemplate: React.FC<Props> = (userInfoChange) => {
  return (
    <div>
      <Header headertext={{ text: "My Page" }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{ pt: "30px", pb: "20px" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "800" }}>
          登録情報
        </Typography>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            color: "#999999",
            bgcolor: "#eeeeee",
            py: "10px",
            borderTop: "1px solid #999999",
            borderBottom: "1px solid #999999",
            mt: "20px",
          }}
        >
          <Typography sx={{ ml: "20px" }}>基本情報</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Grid container>
            <Grid item xs={3} sx={{ pl: "20px" }}>
              <Typography sx={{ fontWeight: "800" }}>名前：</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography sx={{ fontWeight: "800" }}>
                {userInfoChange.userInfoChange.userInfo.name}（
                {userInfoChange.userInfoChange.userInfo.furigana}）
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} sx={{ pl: "20px" }}>
              <Typography sx={{ fontWeight: "800" }}>学年：</Typography>
            </Grid>
            <Grid item xs={9}>
              {userInfoChange.userInfoChange.userInfo.grade === 1 && (
                <Typography sx={{ fontWeight: "800" }}>
                  {userInfoChange.userInfoChange.userInfo.grade}年
                </Typography>
              )}
              {userInfoChange.userInfoChange.userInfo.grade === 2 && (
                <Typography sx={{ fontWeight: "800" }}>
                  {userInfoChange.userInfoChange.userInfo.grade}年
                </Typography>
              )}
              {userInfoChange.userInfoChange.userInfo.grade === 3 && (
                <Typography sx={{ fontWeight: "800" }}>
                  {userInfoChange.userInfoChange.userInfo.grade}年
                </Typography>
              )}
              {userInfoChange.userInfoChange.userInfo.grade === 4 && (
                <Typography sx={{ fontWeight: "800" }}>
                  {userInfoChange.userInfoChange.userInfo.grade}年
                </Typography>
              )}
              {userInfoChange.userInfoChange.userInfo.grade === 5 && (
                <Typography sx={{ fontWeight: "800" }}>M1</Typography>
              )}
              {userInfoChange.userInfoChange.userInfo.grade === 6 && (
                <Typography sx={{ fontWeight: "800" }}>M2</Typography>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} sx={{ pl: "10px" }}>
              <Typography sx={{ fontWeight: "800" }}>学籍番号：</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography sx={{ fontWeight: "800" }}>
                {userInfoChange.userInfoChange.userInfo.student_id}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            color: "#999999",
            bgcolor: "#eeeeee",
            py: "10px",
            borderTop: "1px solid #999999",
            borderBottom: "1px solid #999999",
            mt: "20px",
          }}
        >
          <Typography sx={{ ml: "20px" }}>メールアドレス</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Typography sx={{ ml: "20px", fontWeight: "800" }}>
            {userInfoChange.userInfoChange.userInfo.mailaddress}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            color: "#999999",
            bgcolor: "#eeeeee",
            py: "10px",
            borderTop: "1px solid #999999",
            borderBottom: "1px solid #999999",
            mt: "20px",
          }}
        >
          <Typography sx={{ ml: "20px" }}>ポジション</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          {userInfoChange.userInfoChange.userInfo.position === 3 && (
            <Typography sx={{ ml: "20px", fontWeight: "800" }}>
              オフェンス
            </Typography>
          )}
          {userInfoChange.userInfoChange.userInfo.position === 2 && (
            <Typography sx={{ ml: "20px", fontWeight: "800" }}>
              ディフェンス
            </Typography>
          )}
          {userInfoChange.userInfoChange.userInfo.position === 1 && (
            <Typography sx={{ ml: "20px", fontWeight: "800" }}>
              ゴールキーパー
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            color: "#999999",
            bgcolor: "#eeeeee",
            py: "10px",
            borderTop: "1px solid #999999",
            borderBottom: "1px solid #999999",
            mt: "20px",
          }}
        >
          <Typography sx={{ ml: "20px" }}>経験歴</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          {userInfoChange.userInfoChange.userInfo.experience === 3 && (
            <Typography sx={{ ml: "20px", fontWeight: "800" }}>
              現在サッカー部やフットサル部でやっている
            </Typography>
          )}
          {userInfoChange.userInfoChange.userInfo.experience === 2 && (
            <Typography sx={{ ml: "20px", fontWeight: "800" }}>
              高校までやっていた
            </Typography>
          )}
          {userInfoChange.userInfoChange.userInfo.experience === 1 && (
            <Typography sx={{ ml: "20px", fontWeight: "800" }}>
              小学校または中学校までやっていた
            </Typography>
          )}
          {userInfoChange.userInfoChange.userInfo.experience === 0 && (
            <Typography sx={{ ml: "20px", fontWeight: "800" }}>
              一度もサッカー部に入ったことがない
            </Typography>
          )}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{ pt: "30px", pb: "20px" }}
        >
          <BaseButton
            baseButton={{
              buttonText: "変更",
              onClick: userInfoChange.userInfoChange.handle,
              width: "120px",
              height: "50px",
              mt: "20px",
              mb: "50px",
            }}
          />
        </Grid>
      </Grid>
      <HomeFooter footerValue={{ vnum: 3 }} />
    </div>
  );
};

export default ListUserInfoTemplate;
