import React from "react";
import { AppBar, Typography, Grid } from "@mui/material";
import { HeaderText } from "../type/velmelazo";

type Props = {
  headertext: HeaderText;
};

const Header: React.FC<Props> = ({ headertext }) => {
  return (
    <AppBar
      position="sticky"
      sx={{ borderBottom: "2px solid #333333", bgcolor: "white" }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{ color: "#2196F3", fontWeight: "700", pt: "10px", pb: "10px" }}
          >
            {headertext.text}
          </Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
