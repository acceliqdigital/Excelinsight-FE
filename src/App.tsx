import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./utilities/routes";
import Authentication from "@screens/authentication/Authentication";
import SignupForm from "@screens/authentication/AuthComponents/SignupForm";
import LoginForm from "@screens/authentication/AuthComponents/LoginForm";
import ForgotPassword from "@screens/authentication/AuthComponents/ForgotPassword";
import ResetPassword from "@screens/authentication/AuthComponents/ResetPassword";
import ProfileDetails from "@screens/authentication/AuthComponents/ProfileDetails";
import Upload from "@screens/Upload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/combineStore";
import DashboardChats from "./screens/Dashboard/DashboardChats";
import TopNavbar from "./components/AppBar/TopNavbar";

function App() {
  const { userToken } = useSelector(
    (state: RootState) => state.userStateReducer
  );
  if (userToken == null) {
    return (
      <>
        <ToastContainer />
        <Routes>
          <Route path={routes.HOME}>
            <Route element={<Authentication />}>
              <Route index element={<LoginForm />} />
              <Route path={routes.SIGNUP} element={<SignupForm />} />
              <Route
                path={routes.FORGOT_PASSWORD}
                element={<ForgotPassword />}
              />
              <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
              <Route path={routes.PROFILE_KYC} element={<ProfileDetails />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={routes.HOME} />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <ToastContainer />
        <Routes>
          {/* <div onClick={() => navigator(`${routes.HOME}${routes.UPLOAD}`)}>Dashboard</div> */}
          <Route path={routes.HOME} element={<TopNavbar />}>
            <Route index element={<DashboardChats />} />
            <Route path={routes.UPLOAD} element={<Upload />} />
          </Route>
          <Route path="*" element={<Navigate to={routes.HOME} />} />
        </Routes>
      </>
    );
  }
}

export default App;
