// 3rd Party Modules
import { createBrowserRouter } from "react-router-dom";

// Local Modules
import { App } from "./App";
import { Login } from "../pages/Login/Login";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [{ path: "/login", element: <Login /> }],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
