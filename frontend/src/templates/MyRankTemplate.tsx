import React from "react";
import { Grid, Typography, AppBar, Box, Tab, Tabs } from "@mui/material";
import type { Swiper as SwiperCore } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PermIdentity from "@mui/icons-material/PermIdentity";
import { MilitaryTech } from "@mui/icons-material";

import { RankInfo } from "../type/velmelazo";
import Header from "../components/Header";
import YourRankList from "../components/YourRankList";
import HomeFooter from "../components/HomeFooter";
import AwardList from "../components/AwardList";
import Maintenance from "../parts/Maintenance";

type Props = {
  rankInfo: RankInfo;
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

const MyRankTemplate: React.FC<Props> = ({ rankInfo }) => {
  const [swiper, setSwiper] = React.useState<SwiperCore | null>(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    swiper?.slideTo(newValue);
  };
  const onSwiper = (currentSwiper: SwiperCore) => {
    const swiperInstance = currentSwiper;
    setSwiper(swiperInstance);
  };
  const onSlideChange = (currentSwiper: SwiperCore) => {
    setValue(currentSwiper.activeIndex);
  };

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
          <Tab icon={<PermIdentity />} {...a11yProps(0)} />
          <Tab icon={<MilitaryTech />} {...a11yProps(1)} />
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
              <YourRankList yourRankInfo={rankInfo.yourRankInfo} />
            </TabPanel>
          </SwiperSlide>
          <SwiperSlide>
            <TabPanel key={1} value={value} index={1}>
              <AwardList />
            </TabPanel>
          </SwiperSlide>
        </Swiper>
      </Grid>

      <HomeFooter footerValue={{ vnum: 2 }} />
    </Grid>
  );
};

export default MyRankTemplate;
