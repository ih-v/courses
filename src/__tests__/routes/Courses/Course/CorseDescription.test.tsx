import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useAsyncValue } from "react-router-dom";

import { COURSE_SERIALIZED_DATA as courseData } from "../../../__fake__";
import CourseDescription from "../../../../routes/Courses/Course/CourseDescription";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useAsyncValue: vi.fn(),
}));

describe("CourseDescription component testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should be rendered", () => {
    (useAsyncValue as Mock).mockReturnValue(courseData);

    render(<CourseDescription />);

    expect(screen.getByTestId("course-description")).toBeInTheDocument();
    expect(screen.getByText(/of Motivation & How/i)).toBeInTheDocument();
    expect(screen.getByText(/published: mon mar 06 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/total duration: 00:08:41/i)).toBeInTheDocument();
    expect(screen.getByText(/inner drive by managing/i)).toBeInTheDocument();
    expect(screen.getByText(/your motives, overcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/#productivity/i)).toBeInTheDocument();
  });
});
