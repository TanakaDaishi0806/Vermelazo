import { Grid } from "@mui/material";

import AdminHeader from "../components/AdminHeader";
import ResisterPositionMom from "../components/ResisterPositionMom";
import AdminFooter from "../components/AdminFooter";

type Props = {
  clubMatchID: number;
};

const ResisterOFMomTemplate: React.FC<Props> = ({ clubMatchID }) => {
  const pnum = 3;
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
          positionText: "OF",
          getUrlPositionMember: `http://localhost:18000/admin/user/position/list/${clubMatchID}/3`,
          getUrlPositionMom: `http://localhost:18000/admin/mom/position/list/${clubMatchID}`,
          postUrl: `http://localhost:18000/admin/mom/position/add`,
          toUrl: "/admin",
          club_match_id: clubMatchID,
          position: pnum,
        }}
      />
      <AdminFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default ResisterOFMomTemplate;
