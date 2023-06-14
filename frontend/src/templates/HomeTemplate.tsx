import Header from "../components/Header";
import ClubMatchList from "../components/ClubMatchList";

const HomeTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "My Page" }} />
      <ClubMatchList
        getUrl={{ url: "http://localhost:18000/home", isAdmin: false }}
      />
    </div>
  );
};

export default HomeTemplate;
