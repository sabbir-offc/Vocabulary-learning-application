import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";

import Root from "../Layout/Root";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;