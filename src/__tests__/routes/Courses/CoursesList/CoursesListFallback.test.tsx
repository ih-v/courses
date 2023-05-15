import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import CoursesListFallback from "../../../../routes/Courses/CoursesList/CoursesListFallback";

describe("CoursesListFallback component testing", () => {
  test("should be rendered", () => {
    render(<CoursesListFallback />);

    expect(screen.getByTestId("courses-list-fallback")).toBeInTheDocument();
  });
});
