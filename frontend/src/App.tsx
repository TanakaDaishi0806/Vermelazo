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
import CreateMatch from "./pages/CreateMatch";
import ListCreateMatch from "./pages/ListCreateMatch";
import ListAddScoreMatch from "./pages/ListAddScoreMatch";
import AddMatchResult from "./pages/AddMatchResult";
import ResisterOFMom from "./pages/ResisterOFMom";
import ResisterDFMom from "./pages/ResisterDFMom";
import ResisterGKMom from "./pages/ResisterGKMom";
import AdminHomeFinish from "./pages/AdminHomeFinish";
import ListVoteMatch from "./pages/ListVoteMatch";
import ResisterMyTeamVote from "./pages/ResisterMyTeamVote";
import ResisterMatchVote from "./pages/ResisterMatchVote";
import InterimResult from "./pages/InterimResult";
import ResultDetail from "./pages/ResultDetail";
import HomeFinish from "./pages/HomeFinish";
import FinishResult from "./pages/FinishResult";
import MyRank from "./pages/MyRank";
import ListUserInfo from "./pages/ListUserInfo";
import ChangeUserInfo from "./pages/ChangeUserInfo";
import ChangeAdminPassword from "./pages/ChangeAdminPassword";
import AdminTeamList from "./pages/AdminTeamList";
import LoadingCreateTeam from "./pages/LoadingCreateTeam";
import LoadingCreateMatch from "./pages/LoadingCreateMatch";
import LoadingClubMatchFinish from "./pages/LoadingClubMatchFinish";
import ListVoteMatchProgress from "./pages/ListVoteMatchProgress";
import SendMailForgetPassword from "./pages/SendMailForgetPassword";
import SendMailMessageTemplate from "./templates/SendMailMessageTemplate";
import PasswordReset from "./pages/PasswordReset";
import NotPasswordResetMessageTemplate from "./templates/NotPasswordResetMessageTemplate";
import AdminAward from "./pages/AdminAward";
import ResisterAward from "./pages/ResisterAward";
import DeleteAward from "./pages/DeleteAward";
import AuthTokenReset1 from "./pages/AuthTokenReset1";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newaccountcreate" element={<NewAccountCreate />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/finish" element={<HomeFinish />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/finish" element={<AdminHomeFinish />} />
        <Route path="/admin/addclubmatch" element={<AddClubMatch />} />
        <Route path="/admin/changeclubmatch" element={<ChangeClubMatch />} />
        <Route path="/admin/team/create" element={<CreateTeam />} />
        <Route
          path="/admin/team/create/loading"
          element={<LoadingCreateTeam />}
        />
        <Route path="/admin/team/change" element={<ChangeTeamMember />} />
        <Route path="/home/teamlist" element={<TeamList />} />
        <Route path="/admin/match/create" element={<CreateMatch />} />
        <Route
          path="/admin/match/create/loading"
          element={<LoadingCreateMatch />}
        />
        <Route path="/admin/match/list" element={<ListCreateMatch />} />
        <Route path="/admin/match/score" element={<ListAddScoreMatch />} />
        <Route path="/admin/match/result/add" element={<AddMatchResult />} />
        <Route path="/admin/mom/of" element={<ResisterOFMom />} />
        <Route path="/admin/mom/df" element={<ResisterDFMom />} />
        <Route path="/admin/mom/gk" element={<ResisterGKMom />} />
        <Route path="/home/match/vote" element={<ListVoteMatch />} />
        <Route path="/home/vote/myteam" element={<ResisterMyTeamVote />} />
        <Route path="/home/vote/match" element={<ResisterMatchVote />} />
        <Route path="/home/result/interim" element={<InterimResult />} />
        <Route path="/home/result/detail" element={<ResultDetail />} />
        <Route path="/home/result/finish" element={<FinishResult />} />
        <Route path="/home/rank" element={<MyRank />} />
        <Route path="/home/list/userinfo" element={<ListUserInfo />} />
        <Route path="/home/change/userinfo" element={<ChangeUserInfo />} />
        <Route
          path="/admin/change/password"
          element={<ChangeAdminPassword />}
        />
        <Route path="/admin/teamlist" element={<AdminTeamList />} />
        <Route
          path="/admin/clubmatch/finish/loading"
          element={<LoadingClubMatchFinish />}
        />
        <Route
          path="/home/match/vote/progress"
          element={<ListVoteMatchProgress />}
        />
        <Route
          path="/forgetpassword/sendmail"
          element={<SendMailForgetPassword />}
        />
        <Route
          path="/forgetpassword/sendmail/message"
          element={<SendMailMessageTemplate />}
        />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route
          path="/passwordreset/message"
          element={<NotPasswordResetMessageTemplate />}
        />
        <Route path="/admin/award" element={<AdminAward />} />
        <Route path="/admin/award/resister" element={<ResisterAward />} />
        <Route path="/admin/award/delete" element={<DeleteAward />} />
        <Route path="/admin/authtoken/reset1" element={<AuthTokenReset1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
