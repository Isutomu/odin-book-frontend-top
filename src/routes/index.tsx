// 3rd Party Modules
import { createBrowserRouter } from "react-router-dom";

// Local Modules
import { App } from "./App";
import { Login } from "../pages/Login/Login";
import { UnprotectedRoute } from "./UnprotectedRoute";
import { Signup } from "../pages/Signup/Signup";
import { ProtectedRoute } from "./ProtectedRoute";

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
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
