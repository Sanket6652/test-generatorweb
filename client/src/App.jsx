import { Navigate, Route, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Authenticate from "./pages/Authenticate";
import SignIn from "./components/authenticate/SignIn";
import SignUp from "./components/authenticate/SignUp";
import ForgotPassword from "./components/authenticate/ForgotPassword";
import Profile from "./pages/Profile";
import Dashboard from "./components/profile/Dashboard";
import Tests from "./components/profile/Tests";
import Results from "./components/profile/Results";
import PreviousResults from "./components/profile/results/PreviousResults";
import GenerateCredentials from "./components/profile/tests/GenerateCredentials";
import StartTest from "./components/profile/tests/StartTest";
import ShowTestStatus from "./components/profile/dashboard/ShowTestStatus";
import LiveTest from "./components/profile/tests/LiveTest";
import TestCompleted from "./components/profile/tests/TestCompleted";
import AdminAuthenticate from "./pages/AdminAuthenticate";
import SignInAdmin from "./components/admin authenticate/SignInAdmin";
import SignUpAdmin from "./components/admin authenticate/SignUpAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import RecentTests from "./components/admin/dashboard/RecentTests";
import TestDetails from "./components/admin/tests/TestDetails";
import AdminTests from "./components/admin/tests/AdminTests";
// import Generated from "./components/admin/tests/Generated";
import CreateTest from "./components/admin/tests/CreateTest";
import ReleaseTest from "./components/admin/tests/ReleaseTest";
import UploadKey from "./components/admin/upload key/UploadKey";
import AdminUsers from "./components/admin/users/AdminUsers";
import AdminResults from "./components/admin/results/AdminResults";
import { useSelector } from "react-redux";
import EditTest from "./components/admin/tests/EditTest";
import AdminTestResults from "./components/admin/results/AdminTestResults";
import SortedTests from "./components/profile/tests/SortedTests";

export default function App() {
  const { isStarted, _id } = useSelector(store => store.liveTest);

  const isLoggedIn = useSelector(store => store.user.isLoggedIn);
  const type = useSelector(store => store.user.type);
  return (
    <>
      {isStarted && <Navigate to={`tests/${_id}/test-live/`} />}
      {!isStarted && <Nav isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={isLoggedIn && type === "user" ? <Profile /> : isLoggedIn && type == "admin" ? <Navigate to="/admin" /> : <Navigate to="/user" />}>
          <Route index path="" element={<Dashboard />} />
          <Route path=":id/status" element={<ShowTestStatus />} />
          <Route path="tests/" element={<Tests />}>
            <Route path=":id" element={<SortedTests />} />
          </Route>
          <Route index path="tests/:id/start" element={<StartTest />} />
          <Route index path="tests/:id/generate" element={<GenerateCredentials />} />
          <Route index path="results" element={<Results />} />
          <Route index path="results/:testId" element={<PreviousResults />} />
        </Route>

        <Route index path="/tests/:id/test-live/" element={isLoggedIn && type === "user" ? <LiveTest /> : <Navigate to="/user" />} />
        <Route index path="/tests/test-completed" element={isLoggedIn && type === "user" ? <TestCompleted /> : <Navigate to="/user" />} />

        <Route path="/user" element={!isLoggedIn ? <Authenticate /> : <Navigate to="/" />}>
          <Route index path="" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/admin" element={!isLoggedIn ? <AdminAuthenticate /> : <Navigate to="/admin/dashboard" />}>
          <Route index path="" element={<SignInAdmin />} />
          <Route path="sign-up" element={<SignUpAdmin />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/admin" element={isLoggedIn && type === "admin" ? < AdminDashboard /> : isLoggedIn && type === "user" ? <Navigate to="/" /> : <Navigate to="/admin" />} >
          <Route path="dashboard" element={<RecentTests />} />
          <Route path="dashboard/test/:id/details" element={<TestDetails />} />
          <Route path="tests" element={<AdminTests />}>
            <Route index path="" element={<CreateTest />} />
            {/* <Route path="create-test" element={<CreateTest />} /> */}
            <Route path="release-test" element={<ReleaseTest />} />
            <Route path="edit-test/:testId" element={<EditTest />} />
          </Route>
          <Route path="upload-key" element={<UploadKey />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="results" element={<AdminResults />} />
          <Route path="results/:id" element={<AdminTestResults />} />
        </Route >
      </Routes >
    </>
  )
}