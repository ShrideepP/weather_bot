import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";

import SignIn from "@/views/SignIn";
import Dashboard from "@/views/Dashboard";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SignIn />
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        )
      },
    ],
  },
]);

export default routes;
