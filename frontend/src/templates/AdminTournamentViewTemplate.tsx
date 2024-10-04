import ClubMatchList from "../components/ClubMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";
import { Box, Grid, Typography, Backdrop } from "@mui/material";
import ColorButton from "../parts/ColorButton";

import Tournament from "../components/Tournament";
import { AdminTournamentViewInfo } from "../type/velmelazo";

type Props = {
  adminTournamentViewInfo: AdminTournamentViewInfo;
};

const AdminTournamentViewTemplate: React.FC<Props> = ({
  adminTournamentViewInfo,
}) => {
  return (
    <div>
      <Maintenance />
      <AdminHeader />
      <Tournament tournamentViewInfo={adminTournamentViewInfo.tvi} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mb: "50px" }}
      >
        <ColorButton
          colorButton={{
            buttonText: "変更",
            onClick: adminTournamentViewInfo.handleOpenTournament,
            buttonColor: "info",
            mb: "",
            mt: "",
          }}
        />
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
          open={adminTournamentViewInfo.openTournament}
          onClick={adminTournamentViewInfo.handleCloseTournament}
        >
          <Grid
            container
            sx={{
              bgcolor: "white",
              width: "80%",
              p: "10px",
            }}
          >
            <Grid item xs={12}>
              <Typography sx={{ color: "black" }}>
                決勝トーナメントを変更してもよろしいですか？変更すると,これまでの決勝トーナメントでの対戦データが失われます。
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent="center" alignItems="center">
                <ColorButton
                  colorButton={{
                    buttonText: "キャンセル",
                    onClick: adminTournamentViewInfo.handleCloseTournament,
                    buttonColor: "info",
                    mb: "10px",
                    mt: "20px",
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent="center" alignItems="center">
                <ColorButton
                  colorButton={{
                    buttonText: "変更",
                    onClick: adminTournamentViewInfo.handleCreateTournament,
                    buttonColor: "info",
                    mb: "10px",
                    mt: "20px",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Backdrop>
      </Grid>

      <AdminFooter footerValue={{ vnum: adminTournamentViewInfo.tvi.vnum }} />
    </div>
  );
};

export default AdminTournamentViewTemplate;
