import { Grid, Typography } from "@mui/material";

import { ResultDetailInfo } from "../type/velmelazo";
import Header from "../components/Header";
import TextItem from "../parts/TextItem";

type Props = {
  resultDerailInfo: ResultDetailInfo;
};

const ResultDetailTemplate: React.FC<Props> = ({ resultDerailInfo }) => {
  return (
    <Grid container>
      <Header headertext={{ text: "Home Page" }} />
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: "40px", mb: "20px" }}
        >
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            試合詳細
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            borderTop: "1px solid #888888",
            borderBottom: "1px solid #888888",
            borderRight: "1px solid #888888",
            bgcolor: "#eeeeee",
            py: "10px",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            team{resultDerailInfo.team_name_a}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            borderTop: "1px solid #888888",
            borderBottom: "1px solid #888888",
            bgcolor: "#eeeeee",
            py: "10px",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            team{resultDerailInfo.team_name_b}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={4.5}>
        <Grid
          container
          alignItems="center"
          justifyContent="right"
          sx={{
            borderBottom: "1px solid #888888",
            borderRight: "1px solid #888888",
            pr: "5px",
            py: "10px",
          }}
        >
          {resultDerailInfo.score_a !== -1 && (
            <Typography sx={{ fontSize: "20px" }}>
              {resultDerailInfo.score_a}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          borderBottom: "1px solid #888888",
          borderRight: "1px solid #888888",
          bgcolor: "#eeeeee",
          py: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography
            sx={{
              fontSize: "20px",

              pl: "8px",
            }}
          >
            得点
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={4.5}>
        <Grid
          container
          alignItems="center"
          justifyContent="left"
          sx={{
            borderBottom: "1px solid #888888",
            pl: "5px",
            py: "10px",
          }}
        >
          {resultDerailInfo.score_b !== -1 && (
            <Typography sx={{ fontSize: "20px" }}>
              {resultDerailInfo.score_b}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container sx={{ borderBottom: "1px solid #888888" }}>
        <Grid item xs={4.5}>
          <Grid
            container
            alignItems="center"
            justifyContent="right"
            sx={{
              borderRight: "1px solid #888888",
              pr: "5px",
              py: "10px",
            }}
          >
            {resultDerailInfo.pointGetterA.length !== 0 &&
              resultDerailInfo.pointGetterA.map((pg) => (
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="right">
                    <Typography sx={{ fontSize: "20px" }}>{pg.name}</Typography>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #888888",
            bgcolor: "#eeeeee",
            py: "10px",
          }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Typography
              sx={{
                fontSize: "20px",

                pl: "8px",
              }}
            >
              得点者
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4.5}>
          <Grid
            container
            alignItems="center"
            justifyContent="left"
            sx={{
              pl: "5px",
              py: "10px",
            }}
          >
            {resultDerailInfo.pointGetterB.length !== 0 &&
              resultDerailInfo.pointGetterB.map((pg) => (
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="left">
                    <Typography sx={{ fontSize: "20px" }}>{pg.name}</Typography>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      {resultDerailInfo.is_finish && (
        <Grid
          container
          sx={{
            mt: "10px",
            ml: "10px",
            mb: "10px",
          }}
        >
          <Grid item xs={3}>
            <TextItem textItemInfo={{ itemText: "MOM" }} />
          </Grid>
          <Grid item xs={6}>
            <Grid container alignItems="center" justifyContent="center">
              {resultDerailInfo.mom.length !== 0 &&
                resultDerailInfo.mom.map((pg) => (
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="center">
                      <Typography sx={{ fontSize: "20px" }}>
                        {pg.name}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ResultDetailTemplate;
