// 3rd Party Modules
import { createBrowserRouter } from "react-router-dom";

// Local Modules
import { App } from "./App";
import Boilerplate from "../pages/Boilerplate/Boilerplate";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [{ path: "/app", element: <Boilerplate /> }],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
