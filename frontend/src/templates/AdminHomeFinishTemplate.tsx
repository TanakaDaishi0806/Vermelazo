import FinishClubMatchList from "../components/FinishClubMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Maintenance from "../parts/Maintenance";

const AdminHomeFinishTemplate = () => {
  return (
    <div>
      <Maintenance />
      <AdminHeader />
      <FinishClubMatchList
        getUrl={{
          url: `${process.env.REACT_APP_API_URL}/admin`,
          isAdmin: true,
        }}
      />
      <AdminFooter footerValue={{ vnum: 1 }} />
    </div>
  );
};

export default AdminHomeFinishTemplate;
