// 3rd Party Modules
import { createBrowserRouter } from "react-router-dom";

// Local Modules
import { App } from "./App";
import { Login } from "../pages/Login/Login";
import { UnprotectedRoute } from "./UnprotectedRoute";
import { Signup } from "../pages/Signup/Signup";

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
      element: <div></div>,
      children: [{ path: "/app", element: <div></div> }],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
