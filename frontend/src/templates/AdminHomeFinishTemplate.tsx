import FinishClubMatchList from "../components/FinishClubMatchList";
import Header from "../components/Header";
import AdminFooter from "../components/AdminFooter";

const AdminHomeFinishTemplate = () => {
  return (
    <div>
      <Header headertext={{ text: "Admin Page" }} />
      <FinishClubMatchList
        getUrl={{ url: "http://localhost:18000/admin", isAdmin: true }}
      />
      <AdminFooter footerValue={{ vnum: 1 }} />
    </div>
  );
};

export default AdminHomeFinishTemplate;
