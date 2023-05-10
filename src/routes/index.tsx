import {
  createHashRouter,
  defer,
  LoaderFunctionArgs,
  RouteObject,
} from "react-router-dom";

import { getAll, getById } from "../api/courses.api";
import Error from "../components/Error";

import RootLayout from "./RootLayout";
import Courses from "./Courses";
import CoursesList from "./Courses/CoursesList";
import Course from "./Courses/Course";

const coursesListLoader = async () => {
  return defer({
    courses: getAll(),
  });
};

const courseLoader = async ({ params }: LoaderFunctionArgs) => {
  return defer({
    course: getById(params.courseId),
  });
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Courses />,
        errorElement: <Error />,
        children: [
          {
            path: "",
            element: <CoursesList />,
            loader: coursesListLoader,
          },
          {
            path: "course/:courseId",
            element: <Course />,
            loader: courseLoader,
          },
        ],
      },
    ],
  },
];

export default createHashRouter(routes);
