import { Route, Routes } from 'react-router-dom'
import { routes } from './utilities/routes'
import Authentication from "@screens/authentication/Authentication"
import SignupForm from '@screens/authentication/AuthComponents/SignupForm'
import LoginForm from '@screens/authentication/AuthComponents/LoginForm'
import ForgotPassword from '@screens/authentication/AuthComponents/ForgotPassword'
import ResetPassword from '@screens/authentication/AuthComponents/ResetPassword'
import ProfileDetails from '@screens/authentication/AuthComponents/ProfileDetails'
import Dashboard from './screens/Dashboard'
import Upload from '@screens/Upload'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={routes.HOME} >
          <Route element={<Dashboard />}>
            <Route index element={<div>Dashboard</div>} />
            <Route path={routes.UPLOAD} element={<Upload />} />
          </Route>
          <Route path={routes.AUTH} element={<Authentication />}>
            <Route index element={<LoginForm />} />
            <Route path={routes.SIGNUP} element={<SignupForm />} />
            <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
            <Route path={routes.PROFILE_KYC} element={<ProfileDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
