import React from "react";
import {
  AppBar,
  Typography,
  Grid,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [drawer, setDrawer] = React.useState(false);
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate("/admin/change/password");
  };

  const handleLogout = () => {
    navigate("/adminlogin");
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawer(open);
    };

  const list = () => (
    <Box
      sx={{ width: "200px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider sx={{ mt: "50px" }} />
      <List>
        <ListItem
          key="passwordChange"
          disablePadding
          onClick={handleChangePassword}
        >
          <ListItemButton>
            <ListItemText primary="パスワード変更" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="logout" disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemText primary="ログアウト" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
  return (
    <AppBar
      position="sticky"
      sx={{ borderBottom: "2px solid #333333", bgcolor: "white" }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={2}>
          <Grid container alignItems="center" justifyContent="center">
            <React.Fragment>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor={"left"}
                open={drawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                {list()}
              </SwipeableDrawer>
            </React.Fragment>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container alignItems="center" justifyContent="center">
            <Typography
              variant="h6"
              sx={{
                color: "#2196F3",
                fontWeight: "700",
                pt: "10px",
                pb: "10px",
              }}
            >
              Admin Page
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </AppBar>
  );
};

export default AdminHeader;
