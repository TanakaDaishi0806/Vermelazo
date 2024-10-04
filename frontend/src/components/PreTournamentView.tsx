import ClubMatchList from "../components/ClubMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";
import { Box, Grid, Typography, Backdrop } from "@mui/material";
import ColorButton from "../parts/ColorButton";

import PreTournament from "./PreTournament";
import InterimResultAll from "../pages/InterimResultAll";
import { PreTournamentViewInfo } from "../type/velmelazo";

type Props = {
  preTournamentViewInfo: PreTournamentViewInfo;
};

const PreTournamentView: React.FC<Props> = ({ preTournamentViewInfo }) => {
  return (
    <Grid sx={{ mt: "30px", mb: "40px" }}>
      <PreTournament preTournamentViewInfo={preTournamentViewInfo} />
    </Grid>
  );
};

export default PreTournamentView;
