import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { waitFor, screen } from "@testing-library/react";

import { getAll, getById } from "../../api/courses.api";
import {
  FAKE_ALL_COURSES_SERIALIZED_DATA as coursesData,
  FAKE_COURSE_SERIALIZED_DATA as courseData,
  FAKE_ERROR_DATA as errorData,
} from "../__fake__/themeOptions";
import { renderRoute } from "../__tools__/renderRoute";

vi.mock("../../api/courses.api", () => {
  return {
    getAll: vi.fn(),
    getById: vi.fn(),
  };
});

describe("Routing testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Courses routes rendering", () => {
    test("Courses-route pending: CoursesFallback must be rendered", async () => {
      (getAll as Mock).mockImplementation(() => {
        return new Promise<typeof coursesData>((res) => {
          setTimeout(() => {
            res(coursesData);
          });
        });
      });

      renderRoute("/");
      await waitFor(() => screen.getByTestId("courses-route"));
      expect(screen.getByTestId("courses-route")).toBeInTheDocument();
      expect(screen.getByTestId("courses-toolbar")).toBeInTheDocument();
      expect(screen.getByTestId("courses-fallback")).toBeInTheDocument();
    });

    test("Courses-route loaded: CoursesList must be rendered", async () => {
      (getAll as Mock).mockResolvedValue(coursesData);

      renderRoute("/");
      await waitFor(() => screen.getByTestId("courses-route"));
      expect(screen.getByTestId("courses-route")).toBeInTheDocument();
      expect(screen.getByTestId("courses-toolbar")).toBeInTheDocument();
      expect(screen.getByTestId("courses-list")).toBeInTheDocument();
      const elements = screen.getAllByTestId("course-preview");
      expect(elements.length).toBe(coursesData.length);
    });

    test("Courses-route error: Error-fetching must be rendered", async () => {
      (getAll as Mock).mockRejectedValue(errorData);

      renderRoute("/");
      await waitFor(() => screen.getByTestId("courses-route"));
      expect(screen.getByTestId("courses-route")).toBeInTheDocument();
      expect(screen.getByTestId("courses-toolbar")).toBeInTheDocument();
      expect(screen.getByTestId("error-fetching")).toBeInTheDocument();
      expect(screen.getByText(/resourse not found/i)).toBeInTheDocument();
    });
  });

  describe("Course routes rendering", () => {
    test("Course-route pending: CourseFallback must be rendered", async () => {
      (getById as Mock).mockImplementation(() => {
        return new Promise<typeof courseData>((res) => {
          setTimeout(() => {
            res(courseData);
          });
        });
      });

      renderRoute(`/course/${courseData.id}`);
      await waitFor(() => screen.getByTestId("course-route"));
      expect(screen.getByTestId("course-route")).toBeInTheDocument();
      expect(screen.getByTestId("course-fallback")).toBeInTheDocument();
    });

    test("Course-route loaded: CorseDescription & LessonsList must be rendered", async () => {
      (getById as Mock).mockResolvedValue(courseData);

      renderRoute(`/course/${courseData.id}`);
      await waitFor(() => screen.getByTestId("course-route"));
      expect(screen.getByTestId("course-route")).toBeInTheDocument();
      expect(screen.getByTestId("course-description")).toBeInTheDocument();
      expect(screen.getByTestId("lessons-list")).toBeInTheDocument();
      const elements = screen.getAllByTestId("course-lesson");
      expect(elements.length).toBe(courseData.lessons.length);
    });

    test("Courses-route error: Error-fetching must be rendered", async () => {
      (getById as Mock).mockRejectedValue(errorData);

      renderRoute(`/course/${courseData.id}`);
      await waitFor(() => screen.getByTestId("course-route"));
      expect(screen.getByTestId("course-route")).toBeInTheDocument();
      expect(screen.getByTestId("error-fetching")).toBeInTheDocument();
      expect(screen.getByText(/resourse not found/i)).toBeInTheDocument();
    });
  });

  describe("Not exist route rendering", () => {
    test("Error-route must be rendered", async () => {
      renderRoute("/does-not-exist-path");
      await waitFor(() => screen.getByTestId("error-route"));
      expect(screen.getByTestId("error-route")).toBeInTheDocument();
    });
  });
});
