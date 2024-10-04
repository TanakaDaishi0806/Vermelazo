import React from "react";
import { Grid, Typography, AppBar, Box, Tab, Tabs } from "@mui/material";
import type { Swiper as SwiperCore } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PermIdentity from "@mui/icons-material/PermIdentity";
import { MilitaryTech } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import Groups from "@mui/icons-material/Groups";
import EmojiEvents from "@mui/icons-material/EmojiEvents";

import { FinishResultAllInfo } from "../type/velmelazo";
import Header from "../components/Header";
import YourRankList from "../components/YourRankList";
import HomeFooter from "../components/HomeFooter";
import AwardList from "../components/AwardList";
import Maintenance from "../parts/Maintenance";
import GoalRankers from "../components/GoalRankers";
import FinishResult from "../components/FinishResult";
import TournamentView from "../components/TournamentView";

type Props = {
  finishResultAllInfo: FinishResultAllInfo;
};

type TabPanelProps = React.PropsWithChildren<{
  index: number;
  value: number;
}>;

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const FinishResultAllTemplate: React.FC<Props> = ({ finishResultAllInfo }) => {
  const swiperRef = React.useRef<SwiperCore | null>(null);
  const [value, setValue] = React.useState(finishResultAllInfo.value);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (swiperRef.current) {
      swiperRef.current.slideTo(newValue);
    }
  };

  const onSwiper = (currentSwiper: SwiperCore) => {
    swiperRef.current = currentSwiper;
  };

  const onSlideChange = (currentSwiper: SwiperCore) => {
    setValue(currentSwiper.activeIndex);
  };

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(value);
    }
  }, [value]);

  return (
    <Grid container>
      <Maintenance />
      <Header headertext={{ text: "My Page" }} />
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ bgcolor: "white" }}
        >
          <Tab icon={<Groups />} {...a11yProps(0)} />
          <Tab icon={<EmojiEvents />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Grid container>
        <Swiper
          simulateTouch={false}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
        >
          <SwiperSlide>
            <TabPanel key={0} value={value} index={0}>
              <FinishResult finishResultInfo={finishResultAllInfo} />
            </TabPanel>
          </SwiperSlide>
          <SwiperSlide>
            <TabPanel key={1} value={value} index={1}>
              <TournamentView
                tournamentViewInfo={{
                  club_match_id: finishResultAllInfo.club_match_id,
                  is_finish: finishResultAllInfo.is_finish,
                  vnum: finishResultAllInfo.vnum,
                  url: "/home/result/finish/all",
                }}
              />
            </TabPanel>
          </SwiperSlide>
        </Swiper>
      </Grid>

      <HomeFooter footerValue={{ vnum: finishResultAllInfo.vnum }} />
    </Grid>
  );
};

export default FinishResultAllTemplate;
