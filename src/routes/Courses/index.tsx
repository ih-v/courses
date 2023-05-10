import { Outlet } from "react-router-dom";

import { CoursesProvider } from "./context/CoursesContext";

const Courses = () => {
  return (
    <CoursesProvider>
      <Outlet />
    </CoursesProvider>
  );
};

export default Courses;
