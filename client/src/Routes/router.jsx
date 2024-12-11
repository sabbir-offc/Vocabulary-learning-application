import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";

import Root from "../Layout/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import LessonManagement from "../components/admin/LessonManagement";
import VocabularyManagement from "../components/admin/VocabularyManagement";
import LessonPage from "../Pages/Lessons";

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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/lessons",
        element: <LessonManagement />,
      },
      {
        path: "/lesson/:lessonNo",
        element: <LessonPage />,
      },
      {
        path: "/vocabulary",
        element: <VocabularyManagement />,
      },
    ],
  },
]);

export default router;
