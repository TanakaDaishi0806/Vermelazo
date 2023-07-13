import { Grid } from "@mui/material";

import Header from "../components/Header";
import ResisterPositionMom from "../components/ResisterPositionMom";

type Props = {
  clubMatchID: number;
};

const ResisterDFMomTemplate: React.FC<Props> = ({ clubMatchID }) => {
  const pnum = 2;
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Header headertext={{ text: "Admin Page" }} />
      <ResisterPositionMom
        eachPositionMom={{
          positionText: "DF",
          getUrlPositionMember: `http://localhost:18000/admin/user/position/list/${clubMatchID}/2`,
          getUrlPositionMom: `http://localhost:18000/admin/mom/position/list/${clubMatchID}`,
          postUrl: `http://localhost:18000/admin/mom/position/add`,
          toUrl: "/admin/mom/of",
          club_match_id: clubMatchID,
          position: pnum,
        }}
      />
    </Grid>
  );
};

export default ResisterDFMomTemplate;