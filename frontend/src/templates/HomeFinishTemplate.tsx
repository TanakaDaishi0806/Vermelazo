import Header from "../components/Header";
import FinishClubMatchList from "../components/FinishClubMatchList";
import HomeFooter from "../components/HomeFooter";

const HomeFinishTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "My Page" }} />
      <FinishClubMatchList
        getUrl={{
          url: `${process.env.REACT_APP_API_URL}/home`,
          isAdmin: false,
        }}
      />
      <HomeFooter footerValue={{ vnum: 1 }} />
    </div>
  );
};

export default HomeFinishTemplate;
