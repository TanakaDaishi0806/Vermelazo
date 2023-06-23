import { BrowserRouter, Route, Routes } from "react-router-dom";

import NewAccountCreate from "./pages/NewAccountCreate";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AddClubMatch from "./pages/AddClubMatch";
import ChangeClubMatch from "./pages/ChangeClubMatch";
import CreateTeam from "./pages/CreateTeam";
import ChangeTeamMember from "./pages/ChangeTeamMember";
import TeamList from "./pages/TeamList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newaccountcreate" element={<NewAccountCreate />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/addclubmatch" element={<AddClubMatch />} />
        <Route path="/admin/changeclubmatch" element={<ChangeClubMatch />} />
        <Route path="/admin/team/create" element={<CreateTeam />} />
        <Route path="/admin/team/change" element={<ChangeTeamMember />} />
        <Route path="/home/teamlist" element={<TeamList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
