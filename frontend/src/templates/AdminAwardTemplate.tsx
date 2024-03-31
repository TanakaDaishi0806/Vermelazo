import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

import CategoryTopUserList from "../components/CategoryTopUserList";
import Maintenance from "../parts/Maintenance";

const AdminAwardTemplate = () => {
  return (
    <div>
      <Maintenance />
      <AdminHeader />
      <CategoryTopUserList />
      <AdminFooter footerValue={{ vnum: 2 }} />
    </div>
  );
};

export default AdminAwardTemplate;
