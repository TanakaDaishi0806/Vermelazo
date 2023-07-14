import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HistoryIcon from "@mui/icons-material/History";
import EventIcon from "@mui/icons-material/Event";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";

import { FooterValue } from "../type/velmelazo";

type Props = {
  footerValue: FooterValue;
};

const HomeFooter: React.FC<Props> = ({ footerValue }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

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

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
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
    </Box>
  );
};

export default HomeFooter;
