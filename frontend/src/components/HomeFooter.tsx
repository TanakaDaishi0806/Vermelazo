import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HistoryIcon from "@mui/icons-material/History";
import EventIcon from "@mui/icons-material/Event";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";

import { FooterValue } from "../type/velmelazo";

type Props = {
  footerValue: FooterValue;
};

const HomeFooter: React.FC<Props> = ({ footerValue }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const pageNum = localStorage.getItem("pageNum");
  const progressCLubMatchID = localStorage.getItem("progressClubMatchID");

  React.useEffect(() => {
    setValue(footerValue.vnum);
  }, []);

  const handleHomeNavigate = () => {
    navigate("/home");
  };

  const handleHomeFinishNavigate = () => {
    navigate("/home/finish");
  };

  const handleHomeRankNavigate = () => {
    navigate("/home/rank");
  };
  const handleVoteNavigate = () => {
    navigate("/home/match/vote", {
      state: {
        club_match_id: progressCLubMatchID,
      },
    });
  };

  const handleResultNavigate = () => {
    console.log("interimresult");
    navigate("/home/result/interim", {
      state: {
        club_match_id: progressCLubMatchID,
        vnum: 1,
      },
    });
  };

  const handleTeamNavigate = () => {
    navigate("/home/teamlist", {
      state: {
        club_match_id: progressCLubMatchID,
        vnum: 2,
      },
    });
  };

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      {pageNum === "0" && (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 0) {
              handleHomeNavigate();
            } else {
              handleHomeFinishNavigate();
            }
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="進行中"
            icon={<EventIcon />}
            onClick={handleHomeNavigate}
          />
          <BottomNavigationAction
            label="過去"
            icon={<HistoryIcon />}
            onClick={handleHomeFinishNavigate}
          />
          <BottomNavigationAction
            label="ランク"
            icon={<EmojiEventsIcon />}
            onClick={handleHomeRankNavigate}
          />
        </BottomNavigation>
      )}
      {pageNum === "1" && (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 0) {
              handleHomeNavigate();
            } else {
              handleHomeFinishNavigate();
            }
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="投票"
            icon={<HowToVoteIcon />}
            onClick={handleVoteNavigate}
          />
          <BottomNavigationAction
            label="途中結果"
            icon={<ScoreboardIcon />}
            onClick={handleResultNavigate}
          />
          <BottomNavigationAction
            label="チーム"
            icon={<GroupsIcon />}
            onClick={handleTeamNavigate}
          />
        </BottomNavigation>
      )}
    </Box>
  );
};

export default HomeFooter;
