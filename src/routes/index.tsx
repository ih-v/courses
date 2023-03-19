import {
  createBrowserRouter,
  defer,
  LoaderFunctionArgs,
} from "react-router-dom";
import { getAll, getById } from "../api/courses.api";
import CourseItem from "./Course";
import Courses from "./Courses";
import ErrorPage from "./ErrorPage";
import Root from "./Root";

const coursesLoader = async () => {
  return defer({
    courses: getAll(),
  });
};

const courseLoader = async ({ params }: LoaderFunctionArgs) => {
  return defer({
    course: getById(params.courseId),
  });
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Courses />,
        loader: coursesLoader,
      },
      {
        path: "course/:courseId",
        element: <CourseItem />,
        loader: courseLoader,
      },
    ],
  },
]);

export default router;
