import FinishClubMatchList from "../components/FinishClubMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

const AdminHomeFinishTemplate = () => {
  return (
    <div>
      <AdminHeader />
      <FinishClubMatchList
        getUrl={{ url: "http://localhost:18000/admin", isAdmin: true }}
      />
      <AdminFooter footerValue={{ vnum: 1 }} />
    </div>
  );
};

export default AdminHomeFinishTemplate;
