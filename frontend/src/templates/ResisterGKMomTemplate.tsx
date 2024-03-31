import { Grid } from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import ResisterPositionMom from "../components/ResisterPositionMom";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";

type Props = {
  clubMatchID: number;
};

const ResisterGKMomTemplate: React.FC<Props> = ({ clubMatchID }) => {
  const pnum = 1;
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ mb: "100px" }}
    >
      <Maintenance />
      <AdminHeader />
      <ResisterPositionMom
        eachPositionMom={{
          positionText: "GK",
          getUrlPositionMember: `${process.env.REACT_APP_API_URL}/admin/user/position/list/${clubMatchID}/1`,
          getUrlPositionMom: `${process.env.REACT_APP_API_URL}/admin/mom/position/list/${clubMatchID}`,
          postUrl: `${process.env.REACT_APP_API_URL}/admin/mom/position/add`,
          toUrl: "/admin/mom/df",
          club_match_id: clubMatchID,
          position: pnum,
        }}
      />
      <AdminFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default ResisterGKMomTemplate;
