import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routes } from './utilities/routes'
import Authentication from "@screens/authentication/Authentication"
import SignupForm from '@screens/authentication/AuthComponents/SignupForm'
import LoginForm from '@screens/authentication/AuthComponents/LoginForm'

function App() {
  return (
    <>
      <Routes>
        <Route path={routes.HOME} >
          <Route index element={<div>home</div>} />
          <Route path={routes.AUTH} element={<Authentication />}>
            <Route path={routes.SIGNUP} element={<SignupForm />} />
            <Route path={routes.LOGIN} element={<LoginForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
