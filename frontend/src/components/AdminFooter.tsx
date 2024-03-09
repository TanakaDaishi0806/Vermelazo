import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HistoryIcon from "@mui/icons-material/History";
import EventIcon from "@mui/icons-material/Event";
import { MilitaryTech } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { FooterValue } from "../type/velmelazo";

type Props = {
  footerValue: FooterValue;
};

const AdminFooter: React.FC<Props> = ({ footerValue }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(footerValue.vnum);
  }, []);

  const handleAdminNavigate = () => {
    navigate("/admin");
  };

  const handleAdminFinishNavigate = () => {
    navigate("/admin/finish");
  };

  const handleAdminAwardNavigate = () => {
    navigate("/admin/award");
  };

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 0) {
            handleAdminNavigate();
          } else if (newValue === 1) {
            handleAdminFinishNavigate();
          } else if (newValue === 2) {
            handleAdminAwardNavigate();
          }
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="進行中" icon={<EventIcon />} />
        <BottomNavigationAction label="過去" icon={<HistoryIcon />} />
        <BottomNavigationAction label="アワード" icon={<MilitaryTech />} />
      </BottomNavigation>
    </Box>
  );
};

export default AdminFooter;
