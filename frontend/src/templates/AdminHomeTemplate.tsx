import ClubMatchList from "../components/ClubMatchList";
import Header from "../components/Header";

const AdminHomeTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "Admin Page" }} />
      <ClubMatchList />
    </div>
  );
};

export default AdminHomeTemplate;
