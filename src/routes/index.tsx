// 3rd Party Modules
import { createBrowserRouter } from "react-router-dom";

// Local Modules
import { App } from "./App";
import { Login } from "../pages/Login/Login";
import { UnprotectedRoute } from "./UnprotectedRoute";
import { Signup } from "../pages/Signup/Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import { Homepage } from "../pages/Homepage/Homepage";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          element: <UnprotectedRoute />,
          children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
          ],
        },
      ],
    },
    {
      path: "/app",
      element: <ProtectedRoute />,
      children: [{ path: "/app", element: <Homepage /> }],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
