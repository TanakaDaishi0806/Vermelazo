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
import axios from "axios";

// 有効期限付きで保存する関数
const saveWithExpiry = (key: string, value: string, ttl: number) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// 有効期限をチェックして取得する関数
const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

const AdminHeader = () => {
  const [drawer, setDrawer] = React.useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const confValid = getWithExpiry("confValid");

  const handleChangePassword = () => {
    navigate("/admin/change/password");
  };

  const handleTokenReset = () => {
    navigate("/admin/authtoken/reset1");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/adminlogin");
  };

  React.useEffect(() => {
    if (confValid === null) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/admin/authtoken/conf`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          saveWithExpiry("confValid", "confidence", 24 * 60 * 60 * 1000);
        })
        .catch((error) => {
          console.log(error);
          navigate("/admin/authtoken/reset1");
        });
    }
  }, []);

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
        <ListItem key="tokenReset" disablePadding onClick={handleTokenReset}>
          <ListItemButton>
            <ListItemText primary="トークンの再設定" />
          </ListItemButton>
        </ListItem>
      </List>
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
