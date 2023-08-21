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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

import { HeaderText } from "../type/velmelazo";
import ExplainParticipant from "../parts/ExplainParticipant";
import ExplainPoint from "../parts/ExplainPoint";
import ExplainVote from "../parts/ExplainVote";
import ExplainMom from "../parts/ExplainMom";

type Props = {
  headertext: HeaderText;
};

const Header: React.FC<Props> = ({ headertext }) => {
  const [drawer, setDrawer] = React.useState(false);
  const [participantOpen, setParticipantOpen] = React.useState(false);
  const [voteOpen, setVoteOpen] = React.useState(false);
  const [pointOpen, setPointOpen] = React.useState(false);
  const [momOpen, setMomOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleUserInfo = () => {
    navigate("/home/list/userinfo");
  };

  const handleLogout = () => {
    navigate("/");
  };
  const handleParticipantOpen = () => {
    setParticipantOpen(true);
  };
  const handleParticipantClose = () => {
    setParticipantOpen(false);
  };

  const handleVoteOpen = () => {
    setVoteOpen(true);
  };
  const handleVoteClose = () => {
    setVoteOpen(false);
  };

  const handlePointOpen = () => {
    setPointOpen(true);
  };
  const handlePointClose = () => {
    setPointOpen(false);
  };

  const handleMomOpen = () => {
    setMomOpen(true);
  };
  const handleMomClose = () => {
    setMomOpen(false);
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
        <ListItem key="userinfo" disablePadding onClick={handleUserInfo}>
          <ListItemButton>
            <ListItemText primary="ユーザー情報" />
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
      <List sx={{ mt: "30px" }}>
        <ListItem key="explain" disablePadding>
          <ListItemButton>
            <ListItemText
              primary={
                <Typography fontWeight="bold" fontSize="18px">
                  ヘルプ
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="explain" disablePadding onClick={handleParticipantOpen}>
          <ListItemButton>
            <ListItemText primary="参加方法" />
          </ListItemButton>
          <KeyboardArrowRightIcon />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="explain" disablePadding onClick={handleVoteOpen}>
          <ListItemButton>
            <ListItemText primary="投票方法" />
          </ListItemButton>
          <KeyboardArrowRightIcon />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="explain" disablePadding onClick={handlePointOpen}>
          <ListItemButton>
            <ListItemText primary="ポイント" />
          </ListItemButton>
          <KeyboardArrowRightIcon />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="explain" disablePadding onClick={handleMomOpen}>
          <ListItemButton>
            <ListItemText primary="MOM" />
          </ListItemButton>
          <KeyboardArrowRightIcon />
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
              {headertext.text}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <ExplainParticipant
        backDropInfo={{
          open: participantOpen,
          handleClose: handleParticipantClose,
        }}
      />
      <ExplainVote
        backDropInfo={{
          open: voteOpen,
          handleClose: handleVoteClose,
        }}
      />
      <ExplainPoint
        backDropInfo={{
          open: pointOpen,
          handleClose: handlePointClose,
        }}
      />
      <ExplainMom
        backDropInfo={{
          open: momOpen,
          handleClose: handleMomClose,
        }}
      />
    </AppBar>
  );
};

export default Header;
