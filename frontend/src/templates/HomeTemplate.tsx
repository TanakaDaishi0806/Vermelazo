import Header from "../components/Header";
import ClubMatchList from "../components/ClubMatchList";
import HomeFooter from "../components/HomeFooter";

const HomeTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "My Page" }} />
      <ClubMatchList
        getUrl={{ url: "http://localhost:18000/home", isAdmin: false }}
      />
      <HomeFooter footerValue={{ vnum: 0 }} />
    </div>
  );
};

export default HomeTemplate;
