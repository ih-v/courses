import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import CourseFallback from "../../../../routes/Courses/Course/CourseFallback";

describe("CourseFallback component testing", () => {
  test("should be rendered", () => {
    render(<CourseFallback />);

    expect(screen.getByTestId("course-fallback")).toBeInTheDocument();
  });
});
