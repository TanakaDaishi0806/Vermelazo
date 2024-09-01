import {
  Grid,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  StepContent,
  Paper,
  Box,
} from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";
import { AuthTokenReset1Info } from "../type/velmelazo";
import BaseButton from "../parts/BaseButton";

type Props = {
  authTokenReset1Info: AuthTokenReset1Info;
};

const AuthTokenReset1Template: React.FC<Props> = ({ authTokenReset1Info }) => {
  return (
    <div>
      <Maintenance />
      <AdminHeader />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={3}
      >
        <Grid item xs={12} sm={8} md={6} lg={4} sx={{ mx: "3%" }}>
          <Stepper
            activeStep={authTokenReset1Info.activeStep}
            orientation="vertical"
          >
            <Step key={authTokenReset1Info.steps[0]}>
              <StepLabel
                optional={
                  0 === authTokenReset1Info.steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {authTokenReset1Info.steps[0]}
              </StepLabel>
              <StepContent>
                <Grid item xs={12} sm={8} md={6} lg={4} sx={{}}>
                  <Typography>
                    まず下記の”認証URLへアクセス”をクリックして、認証用のgoogleアカウントを洗濯してください。その後は”続行”のボタンをおしていってください。
                    最後に”ページに到達できません”とでるので、”localhost”から始まるURLを全選択してコピーしてください。
                  </Typography>
                  <a
                    href={authTokenReset1Info.auth_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textAlign: "center",
                      display: "block",
                      marginTop: "20px",
                      marginBottom: "40px",
                    }}
                  >
                    認証URLへアクセス
                  </a>
                </Grid>
                <Grid
                  container
                  xs={12}
                  sm={8}
                  md={6}
                  lg={4}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={authTokenReset1Info.handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {0 === authTokenReset1Info.steps.length - 1
                        ? "Finish"
                        : "Continue"}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      disabled={true}
                      onClick={authTokenReset1Info.handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
            <Step key={authTokenReset1Info.steps[1]}>
              <StepLabel
                optional={
                  1 === authTokenReset1Info.steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {authTokenReset1Info.steps[1]}
              </StepLabel>
              <StepContent>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                >
                  <Grid item xs={12} sm={8} md={6} lg={4} sx={{}}>
                    <Typography>
                      下のテキストボックスに､step1でコピーしたURLを入力して､送信してください。正しいURLが入力された場合、メール送信に必要なシークレット値である”TOKEN_JSON”の新しいバージョンが、GCPで
                      追加されます。
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={4}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: "40px" }}
                  >
                    <TextField
                      label="step1でコピーしたURL"
                      value={authTokenReset1Info.code_url}
                      onChange={authTokenReset1Info.handleCodeUrlChange}
                      error={authTokenReset1Info.codeUrlEmpty}
                      helperText={
                        authTokenReset1Info.codeUrlEmpty
                          ? "http://localhost/?state=state-token&code=・・・&scope=https://mail.google.com/"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={4}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: "20px", mb: "40px" }}
                  >
                    <BaseButton
                      baseButton={{
                        buttonText: "送信",
                        onClick: () => {
                          if (!authTokenReset1Info.codeUrlEmpty) {
                            authTokenReset1Info.handleCodeUrl();
                          } else {
                            authTokenReset1Info.setInputError(true);
                          }
                        },
                        width: "200px",
                        height: "60px",
                        mt: "",
                        mb: "",
                      }}
                    />
                  </Grid>
                  {authTokenReset1Info.inputError && (
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{ color: "red", mx: "auto", mb: "10px" }}
                      >
                        "http://localhost/・・・&code=・・・"
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "red", mx: "auto", mb: "10px" }}
                      >
                        上記のようなURLを入力しましたか?
                        違う場合はstep1にbackして､正しいURLをコピーしてください。
                      </Typography>
                    </Grid>
                  )}
                </Grid>

                <Grid
                  container
                  xs={12}
                  sm={8}
                  md={6}
                  lg={4}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={authTokenReset1Info.handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {1 === authTokenReset1Info.steps.length - 1
                        ? "Finish"
                        : "Continue"}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      disabled={false}
                      onClick={authTokenReset1Info.handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
            <Step key={authTokenReset1Info.steps[2]}>
              <StepLabel
                optional={
                  2 === authTokenReset1Info.steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {authTokenReset1Info.steps[2]}
              </StepLabel>
              <StepContent>
                <Grid item xs={12} sm={8} md={6} lg={4} sx={{ mb: "20px" }}>
                  <Typography>
                    最後に下記のURLにアクセスして、Cloud
                    Runの新しいリビジョンを作成してください。そうすることで、新しいシークレット値を読み込めるようになり、
                    メールを送信できるようになります。新しいリビジョンに切り替えたら、確認のために下のメール送信ボタンを押してください。正常に送れた場合は、
                    ご自身の登録メールアドレスにメールが送信され、ホームに遷移します。もし、何かしらの不備がある場合は、エラーメッセージがページ上部に表示されますので、
                    再度step1からやりなおしてください。
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    <a
                      href={process.env.REACT_APP_CLOUD_RUN_PROUCT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textAlign: "center", display: "block" }}
                    >
                      My CloudRun Productへアクセス
                    </a>
                  </div>
                </Grid>
                {authTokenReset1Info.inputError2 && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: "10px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "red", textAlign: "center" }}
                    >
                      メールの送信に失敗しました。
                    </Typography>
                  </Grid>
                )}
                <Grid
                  container
                  xs={12}
                  sm={8}
                  md={6}
                  lg={4}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={authTokenReset1Info.handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {2 === authTokenReset1Info.steps.length - 1
                        ? "Send Mail"
                        : "Continue"}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      disabled={false}
                      onClick={authTokenReset1Info.handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
          </Stepper>
        </Grid>
      </Grid>
      <AdminFooter footerValue={{ vnum: 100 }} />
    </div>
  );
};

export default AuthTokenReset1Template;
