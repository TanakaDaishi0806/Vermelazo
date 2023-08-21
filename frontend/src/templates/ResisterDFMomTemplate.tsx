import { Grid } from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import ResisterPositionMom from "../components/ResisterPositionMom";
import AdminFooter from "../components/AdminFooter";

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
      sx={{ mb: "100px" }}
    >
      <AdminHeader />
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
      <AdminFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default ResisterDFMomTemplate;
