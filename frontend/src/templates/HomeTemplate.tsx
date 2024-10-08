import Header from "../components/Header";
import ClubMatchList from "../components/ClubMatchList";
import HomeFooter from "../components/HomeFooter";
import Maintenance from "../parts/Maintenance";

const HomeTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "My Page" }} />
      <Maintenance />
      <ClubMatchList
        getUrl={{
          url: `${process.env.REACT_APP_API_URL}/home`,
          isAdmin: false,
        }}
      />
      <HomeFooter footerValue={{ vnum: 0 }} />
    </div>
  );
};

export default HomeTemplate;
