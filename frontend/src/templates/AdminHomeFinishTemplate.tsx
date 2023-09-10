import FinishClubMatchList from "../components/FinishClubMatchList";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

const AdminHomeFinishTemplate = () => {
  return (
    <div>
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
