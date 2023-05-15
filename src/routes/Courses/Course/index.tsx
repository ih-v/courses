import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ICourse } from "../../../types";
import Error from "../../../components/Error";

import CourseDescription from "./CourseDescription";
import CourseFallback from "./CourseFallback";
import CourseLessonsList from "./CourseLessonsList";

type CourseItemData = {
  course: Promise<ICourse>;
};

const Course = () => {
  const { course } = useLoaderData() as CourseItemData;

  return (
    <div data-testid="course">
      <Suspense fallback={<CourseFallback />}>
        <Await resolve={course} errorElement={<Error />}>
          <CourseDescription />
          <CourseLessonsList />
        </Await>
      </Suspense>
    </div>
  );
};

export default Course;
