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
  const [value1, setValue] = React.useState(0);
  const [localStorageNull, setLocalStorageNull] = React.useState(0);
  const pageNum = localStorage.getItem("pageNum");
  let progressCLubMatchID = localStorage.getItem("progressClubMatchID");
  let progressClubMatchTypeString = localStorage.getItem(
    "progressClubMatchType"
  );
  let progressCLubMatchType =
    progressClubMatchTypeString !== null
      ? parseInt(progressClubMatchTypeString, 10)
      : 0; // 0 はデフォルト値

  React.useEffect(() => {
    setValue(footerValue.vnum);
    if (progressCLubMatchID === null || progressClubMatchTypeString === null) {
      if (pageNum === "1") {
        progressCLubMatchID = localStorage.getItem("progressClubMatchID");
        progressClubMatchTypeString = localStorage.getItem(
          "progressClubMatchType"
        );
        progressCLubMatchType =
          progressClubMatchTypeString !== null
            ? parseInt(progressClubMatchTypeString, 10)
            : 0; // 0 はデフォルト値

        setLocalStorageNull(localStorageNull + 1);
      }
    }
  }, [localStorageNull]);

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

  const handleInterimResultType1Page = () => {
    navigate("/home/result/interim/all", {
      state: {
        club_match_id: progressCLubMatchID,
        vnum: 1,
        is_finish: false,
        value: 0,
      },
    });
  };

  const handleInterimResultType0Page = () => {
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
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, zIndex: "10" }}>
      {pageNum === "0" && (
        <BottomNavigation
          showLabels
          value={value1}
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
          value={value1}
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
          {progressCLubMatchType === 0 ? (
            <BottomNavigationAction
              label="途中結果"
              icon={<ScoreboardIcon />}
              onClick={handleInterimResultType0Page}
            />
          ) : (
            <BottomNavigationAction
              label="途中結果"
              icon={<ScoreboardIcon />}
              onClick={handleInterimResultType1Page}
            />
          )}

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
