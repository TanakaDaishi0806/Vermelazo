import React from "react";
import { Grid, Typography, AppBar, Box, Tab, Tabs } from "@mui/material";
import type { Swiper as SwiperCore } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Groups from "@mui/icons-material/Groups";
import EmojiEvents from "@mui/icons-material/EmojiEvents";

import { InterimResultAllInfo } from "../type/velmelazo";
import Header from "../components/Header";
import InterimResult from "../components/InterimResult";
import TournamentView from "../components/TournamentView";
import PreTournamentView from "../components/PreTournamentView";
import Maintenance from "../parts/Maintenance";
import HomeFooter from "../components/HomeFooter";

type Props = {
  interimResultAllInfo: InterimResultAllInfo;
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const InterimResultAllTemplate: React.FC<Props> = ({
  interimResultAllInfo,
}) => {
  const swiperRef = React.useRef<SwiperCore | null>(null);
  const [value, setValue] = React.useState(interimResultAllInfo.value);

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
          <Tab label="予選リーグ" icon={<Groups />} {...a11yProps(0)} />
          <Tab
            label="決勝トーナメント"
            icon={<EmojiEvents />}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <Grid container>
        <Swiper
          simulateTouch={false}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
          initialSlide={value}
        >
          <SwiperSlide>
            <TabPanel key={0} value={value} index={0}>
              <InterimResult interimResultInfo={interimResultAllInfo} />
            </TabPanel>
          </SwiperSlide>
          <SwiperSlide>
            <TabPanel key={1} value={value} index={1}>
              {interimResultAllInfo.tournamentCreated ? (
                <TournamentView
                  tournamentViewInfo={{
                    club_match_id: interimResultAllInfo.club_match_id,
                    is_finish: interimResultAllInfo.is_finish,
                    vnum: interimResultAllInfo.vnum,
                    url: "/home/result/interim/all",
                  }}
                />
              ) : (
                <PreTournamentView
                  preTournamentViewInfo={{
                    club_match_id: interimResultAllInfo.club_match_id,
                    is_finish: interimResultAllInfo.is_finish,
                    vnum: interimResultAllInfo.vnum,
                  }}
                />
              )}
            </TabPanel>
          </SwiperSlide>
        </Swiper>
      </Grid>

      <HomeFooter footerValue={{ vnum: interimResultAllInfo.vnum }} />
    </Grid>
  );
};

export default InterimResultAllTemplate;
