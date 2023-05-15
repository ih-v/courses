import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { waitFor, screen } from "@testing-library/react";

import {
  CourseDescriptionMock,
  CourseFallbackMock,
  CourseLessonsListMock,
  CoursesListContainerMock,
  CoursesListFallbackMock,
  CoursesListToolbarMock,
  ErrorMock,
} from "../__mocks__";
import {
  ALL_COURSES_SERIALIZED_DATA as coursesData,
  COURSE_SERIALIZED_DATA as courseData,
} from "../__fake__";
import { renderRoute } from "../__tools__/renderRoute";
import { getAll, getById } from "../../api/courses.api";

vi.mock("../../components/Error", () => {
  return {
    default: ErrorMock,
  };
});

vi.mock("../../routes/Courses/CoursesList/CoursesListFallback", () => {
  return {
    default: CoursesListFallbackMock,
  };
});

vi.mock("../../routes/Courses/CoursesList/CoursesListToolbar", () => {
  return {
    default: CoursesListToolbarMock,
  };
});

vi.mock("../../routes/Courses/CoursesList/CoursesListContainer", () => {
  return {
    default: CoursesListContainerMock,
  };
});

vi.mock("../../routes/Courses/Course/CourseFallback", () => {
  return {
    default: CourseFallbackMock,
  };
});

vi.mock("../../routes/Courses/Course/CourseDescription", () => {
  return {
    default: CourseDescriptionMock,
  };
});

vi.mock("../../routes/Courses/Course/CourseLessonsList", () => {
  return {
    default: CourseLessonsListMock,
  };
});

vi.mock("../../api/courses.api", () => {
  return {
    getAll: vi.fn(),
    getById: vi.fn(),
  };
});

describe("Routing testing (routes indexes)", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const ERROR_MOCK_ID = "error-mock";
  const ROOT_LAYOUT_ID = "root-layout";

  describe("CoursesList routes rendering", () => {
    const COURSES_LIST_ID = "courses-list";
    const COURSES_LIST_FALLBACK_MOCK_ID = "courses-list-fallback-mock";
    const COURSES_LIST_TOOLBAR_MOCK_ID = "courses-list-toolbar-mock";
    const COURSES_LIST_CONTAINER_MOCK_ID = "courses-list-container-mock";

    test("CoursesList pending - CoursesFallbackMock should be rendered", async () => {
      (getAll as Mock).mockImplementation(() => new Promise(vi.fn()));

      renderRoute("/");

      await waitFor(() => screen.getByTestId(ROOT_LAYOUT_ID));
      expect(screen.queryByTestId(COURSES_LIST_ID)).toBeInTheDocument();
      expect(screen.queryByTestId(ERROR_MOCK_ID)).toBeNull();
      expect(
        screen.queryByTestId(COURSES_LIST_FALLBACK_MOCK_ID)
      ).toBeInTheDocument();
      expect(screen.queryByTestId(COURSES_LIST_TOOLBAR_MOCK_ID)).toBeNull();
      expect(screen.queryByTestId(COURSES_LIST_CONTAINER_MOCK_ID)).toBeNull();
    });

    test("CoursesList loaded - CoursesListToolbarMock & CoursesListContainerMock should be rendered", async () => {
      (getAll as Mock).mockResolvedValue(coursesData);

      renderRoute("/");

      await waitFor(() => screen.getByTestId(ROOT_LAYOUT_ID));
      expect(screen.queryByTestId(COURSES_LIST_ID)).toBeInTheDocument();
      expect(screen.queryByTestId(ERROR_MOCK_ID)).toBeNull();
      expect(screen.queryByTestId(COURSES_LIST_FALLBACK_MOCK_ID)).toBeNull();
      expect(
        screen.queryByTestId(COURSES_LIST_TOOLBAR_MOCK_ID)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(COURSES_LIST_CONTAINER_MOCK_ID)
      ).toBeInTheDocument();
    });

    test("CoursesList error - ErrorMock should be rendered", async () => {
      (getAll as Mock).mockRejectedValue({});

      renderRoute("/");

      await waitFor(() => screen.getByTestId(ROOT_LAYOUT_ID));
      expect(screen.queryByTestId(COURSES_LIST_ID)).toBeInTheDocument();
      expect(screen.queryByTestId(ERROR_MOCK_ID)).toBeInTheDocument();
      expect(screen.queryByTestId(COURSES_LIST_FALLBACK_MOCK_ID)).toBeNull();
      expect(screen.queryByTestId(COURSES_LIST_TOOLBAR_MOCK_ID)).toBeNull();
      expect(screen.queryByTestId(COURSES_LIST_CONTAINER_MOCK_ID)).toBeNull();
    });

    describe("Course routes rendering", () => {
      const COURSE_ID = "course";
      const COURSE_FALLBACK_MOCK_ID = "course-fallback-mock";
      const COURSE_DESCRIPTION_MOCK_ID = "course-description-mock";
      const COURSE_LESSONS_LIST_MOCK_ID = "course-lessons-list-mock";

      test("Course pending - CourseFallbackMock should be rendered", async () => {
        (getById as Mock).mockImplementation(() => new Promise(vi.fn()));

        renderRoute(`/course/${courseData.id}`);

        await waitFor(() => screen.getByTestId(ROOT_LAYOUT_ID));
        expect(screen.queryByTestId(COURSE_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(ERROR_MOCK_ID)).toBeNull();
        expect(
          screen.queryByTestId(COURSE_FALLBACK_MOCK_ID)
        ).toBeInTheDocument();
        expect(screen.queryByTestId(COURSE_DESCRIPTION_MOCK_ID)).toBeNull();
        expect(screen.queryByTestId(COURSE_LESSONS_LIST_MOCK_ID)).toBeNull();
      });

      test("Course loaded - CourseDescriptionMock & CourseLessonsListMock should be rendered", async () => {
        (getById as Mock).mockResolvedValue(courseData);

        renderRoute(`/course/${courseData.id}`);

        await waitFor(() => screen.getByTestId(ROOT_LAYOUT_ID));
        expect(screen.queryByTestId(COURSE_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(ERROR_MOCK_ID)).toBeNull();
        expect(screen.queryByTestId(COURSE_FALLBACK_MOCK_ID)).toBeNull();
        expect(
          screen.queryByTestId(COURSE_DESCRIPTION_MOCK_ID)
        ).toBeInTheDocument();
        expect(
          screen.queryByTestId(COURSE_LESSONS_LIST_MOCK_ID)
        ).toBeInTheDocument();
      });

      test("Course error - ErrorMock should be rendered", async () => {
        (getById as Mock).mockRejectedValue({});

        renderRoute(`/course/${courseData.id}`);

        await waitFor(() => screen.getByTestId(ROOT_LAYOUT_ID));
        expect(screen.queryByTestId(COURSE_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(ERROR_MOCK_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(COURSE_FALLBACK_MOCK_ID)).toBeNull();
        expect(screen.queryByTestId(COURSE_DESCRIPTION_MOCK_ID)).toBeNull();
        expect(screen.queryByTestId(COURSE_LESSONS_LIST_MOCK_ID)).toBeNull();
      });
    });

    describe("Not exist route rendering", () => {
      test("ErrorMock should be rendered", async () => {
        renderRoute("/does-not-exist-path");

        await waitFor(() => screen.getByTestId(ERROR_MOCK_ID));
        expect(screen.getByTestId(ERROR_MOCK_ID)).toBeInTheDocument();
      });
    });
  });
});
