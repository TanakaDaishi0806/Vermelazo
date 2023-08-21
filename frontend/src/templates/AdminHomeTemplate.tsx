import ClubMatchList from "../components/ClubMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

const AdminHomeTemplate = () => {
  return (
    <div>
      <AdminHeader />
      <ClubMatchList
        getUrl={{ url: "http://localhost:18000/admin", isAdmin: true }}
      />
      <AdminFooter footerValue={{ vnum: 0 }} />
    </div>
  );
};

export default AdminHomeTemplate;
