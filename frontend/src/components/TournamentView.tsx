import ClubMatchList from "../components/ClubMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";
import { Box, Grid, Typography, Backdrop } from "@mui/material";
import ColorButton from "../parts/ColorButton";

import Tournament from "../components/Tournament";
import InterimResultAll from "../pages/InterimResultAll";
import { TournamentViewInfo } from "../type/velmelazo";

type Props = {
  tournamentViewInfo: TournamentViewInfo;
};

const TournamentView: React.FC<Props> = ({ tournamentViewInfo }) => {
  return (
    <Grid sx={{ mt: "30px", mb: "40px" }}>
      <Tournament tournamentViewInfo={tournamentViewInfo} />
    </Grid>
  );
};

export default TournamentView;
