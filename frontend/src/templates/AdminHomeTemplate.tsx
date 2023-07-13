import ClubMatchList from "../components/ClubMatchList";
import Header from "../components/Header";
import AdminFooter from "../components/AdminFooter";

const AdminHomeTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "Admin Page" }} />
      <ClubMatchList
        getUrl={{ url: "http://localhost:18000/admin", isAdmin: true }}
      />
      <AdminFooter footerValue={{ vnum: 0 }} />
    </div>
  );
};

export default AdminHomeTemplate;
