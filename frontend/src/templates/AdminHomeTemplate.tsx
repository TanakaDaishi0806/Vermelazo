import ClubMatchList from "../components/ClubMatchList";
import Header from "../components/Header";

const AdminHomeTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "Admin Page" }} />
      <ClubMatchList
        getUrl={{ url: "http://localhost:18000/admin", isAdmin: true }}
      />
    </div>
  );
};

export default AdminHomeTemplate;
