import ClubMatchData from "../components/ClubMatchData";
import Header from "../components/Header";

const AdminHomeTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "Admin Page" }} />
      <ClubMatchData />
    </div>
  );
};

export default AdminHomeTemplate;
