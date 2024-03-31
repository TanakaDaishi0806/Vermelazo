import ClubMatchList from "../components/ClubMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";

const AdminHomeTemplate = () => {
  return (
    <div>
      <Maintenance />
      <AdminHeader />
      <ClubMatchList
        getUrl={{
          url: `${process.env.REACT_APP_API_URL}/admin`,
          isAdmin: true,
        }}
      />
      <AdminFooter footerValue={{ vnum: 0 }} />
    </div>
  );
};

export default AdminHomeTemplate;
