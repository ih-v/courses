import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useAsyncValue } from "react-router-dom";

import {
  THEME_OPTIONS as themeOptions,
  COURSE_SERIALIZED_DATA as courseData,
  COURSES_CONTEXT_STATE as state,
} from "../../../__fake__";
import { CourseLessonsListItemMock } from "../../../__mocks__";

import CourseLessonsList from "../../../../routes/Courses/Course/CourseLessonsList";
import { useCoursesContext } from "../../../../routes/Courses/context/CoursesContext";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useAsyncValue: vi.fn(),
}));

vi.mock("../../../../routes/Courses/context/CoursesContext", () => ({
  useCoursesContext: vi.fn(),
}));

vi.mock("../../../../routes/Courses/Course/CourseLessonsListItem", () => {
  return {
    default: CourseLessonsListItemMock,
  };
});

describe("CourseLessonsList component testing", () => {
  const theme = createTheme(themeOptions);
  const setState = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should be rendered & set to context initial lesson info", async () => {
    (useAsyncValue as Mock).mockReturnValue(courseData);
    (useCoursesContext as Mock).mockReturnValue({
      state,
      setState,
    });

    render(
      <ThemeProvider theme={theme}>
        <CourseLessonsList />
      </ThemeProvider>
    );

    expect(screen.getByTestId("course-lessons-list")).toBeInTheDocument();
    const children = screen.getAllByTestId("course-lessons-list-item-mock");
    expect(children.length).toBe(2);
    expect(setState).toHaveBeenCalledOnce();
    expect(setState).toHaveBeenCalledWith(expect.any(Function));
  });
});
