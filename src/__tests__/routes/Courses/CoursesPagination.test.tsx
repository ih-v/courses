import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { CoursesProvider } from "../../../contexts/CoursesContext";
import CoursesPagination from "../../../routes/Courses/CoursesPagination";

describe("CoursesPagination component testing", () => {
  test("Check pages count: must be 5 buttons (3 pages)", () => {
    render(
      <CoursesProvider>
        <CoursesPagination length={30} divider={10} />
      </CoursesProvider>
    );
    expect(screen.getByTestId("courses-pagination")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(5);
  });

  test("Check pages count: must be 3 buttons (1 page)", () => {
    render(
      <CoursesProvider>
        <CoursesPagination length={3} divider={5} />
      </CoursesProvider>
    );
    expect(screen.getByTestId("courses-pagination")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(3);
  });

  test("Check pages count: must be 8 buttons (6 pages)", () => {
    render(
      <CoursesProvider>
        <CoursesPagination length={51} divider={10} />
      </CoursesProvider>
    );
    expect(screen.getByTestId("courses-pagination")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(8);
  });
});
