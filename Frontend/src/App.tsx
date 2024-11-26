import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layaout } from "./components/Layaout"
import { ErrorLink } from "./pages/Error/ErrorLink"
import { Home } from "./pages/Home/Home"
import { Register } from "./pages/Auth/Register/Register"
import { Login } from "./pages/Auth/Login/Login"
import { OTP } from "./pages/Auth/OTP/OTP"
import { School } from "./pages/School/School"
import { DetailSchool } from "./pages/School/DetailSchool/DetailSchool"
import { Config } from "./pages/Config/Config"
import { HelpSupport } from "./pages/Config/components/helpSupport/HelpSupport"
import { Profile } from "./pages/Config/components/profile/Profile"
import { Configuration } from "./pages/Config/components/configuration/Configuration"
import { Security } from "./pages/Config/components/security/Security"
import { EditInsti } from "./pages/Config/components/editInsti/EditInsti"
import { PoliticsPrivacity } from "./pages/Config/components/politicsPrivacity/PoliticsPrivacity"
import { SchoolForm } from "./pages/SchoolForm/CreateSchool/SchoolForm"
import { AuthAuthenticated } from "./utils/auth"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layaout />,
      errorElement: <ErrorLink />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/schools',
          element: <School />
        },
        {
          path: '/school/:schoolId',
          element: <DetailSchool />
        },
        {
          path: '/schoolForm',
          element: <AuthAuthenticated><SchoolForm /></AuthAuthenticated>
        },
        {
          path: '/config',
          element: <Config />,
          children: [
            { path: '', element: <Configuration /> }, // Ruta por defecto
            { path: 'profile', element: <AuthAuthenticated><Profile /></AuthAuthenticated> },
            { path: 'security', element: <AuthAuthenticated><Security /></AuthAuthenticated> },
            { path: 'editInsti', element: <AuthAuthenticated><EditInsti /></AuthAuthenticated> },
            { path: 'config', element: <Configuration /> },
            { path: 'help', element: <HelpSupport /> },
            { path: 'politicsPrivacity', element: <PoliticsPrivacity /> },
          ],
        }
      ]
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/verify-email',
      element: <OTP />
    },
  ])

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
