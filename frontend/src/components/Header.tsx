import { AppBar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "rgba(51, 51, 51, 0.7)" }}>
      <Typography sx={{ color: "red", pl: "10px", pt: "10px", pb: "10px" }}>
        vermelazo
      </Typography>
    </AppBar>
  );
};

export default Header;
