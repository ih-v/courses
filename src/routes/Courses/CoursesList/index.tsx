import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ICoursesListItem } from "../../../types";
import Error from "../../../components/Error";

import CoursesListFallback from "./CoursesListFallback";
import CoursesListToolbar from "./CoursesListToolbar";
import CoursesListContainer from "./CoursesListContainer";

type CoursesListData = {
  courses: Promise<ICoursesListItem[]>;
};

const CoursesList = () => {
  const { courses } = useLoaderData() as CoursesListData;
  return (
    <div data-testid="courses-list">
      <Suspense fallback={<CoursesListFallback />}>
        <Await resolve={courses} errorElement={<Error />}>
          <CoursesListToolbar />
          <CoursesListContainer />
        </Await>
      </Suspense>
    </div>
  );
};

export default CoursesList;
