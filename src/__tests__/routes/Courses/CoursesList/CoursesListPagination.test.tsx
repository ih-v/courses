import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { CoursesProvider } from "../../../../routes/Courses/context/CoursesContext";
import CoursesListPagination from "../../../../routes/Courses/CoursesList/CoursesListPagination";

describe("CoursesListPagination component testing", () => {
  const renderComponentWithProps = (length: number, divider: number) => {
    render(
      <CoursesProvider>
        <CoursesListPagination length={length} divider={divider} />
      </CoursesProvider>
    );
  };

  test("Check pages count: must be 5 buttons (3 pages)", () => {
    renderComponentWithProps(30, 10);

    expect(screen.getByTestId("courses-list-pagination")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(5);
  });

  test("Check pages count: must be 3 buttons (1 page)", () => {
    renderComponentWithProps(3, 5);

    expect(screen.getByTestId("courses-list-pagination")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(3);
  });

  test("Check pages count: must be 8 buttons (6 pages)", () => {
    renderComponentWithProps(51, 10);

    expect(screen.getByTestId("courses-list-pagination")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(8);
  });
});
