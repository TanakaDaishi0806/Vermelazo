import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

import CategoryTopUserList from "../components/CategoryTopUserList";

const AdminAwardTemplate = () => {
  return (
    <div>
      <AdminHeader />
      <CategoryTopUserList />
      <AdminFooter footerValue={{ vnum: 2 }} />
    </div>
  );
};

export default AdminAwardTemplate;
