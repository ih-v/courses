import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CoursesProvider } from "../../../../routes/Courses/context/CoursesContext";
import CoursesListToolbar from "../../../../routes/Courses/CoursesList/CoursesListToolbar";

describe("CoursesListToolbar component testing", () => {
  beforeEach(() => {
    render(
      <CoursesProvider>
        <CoursesListToolbar />
      </CoursesProvider>
    );
  });

  test("should be rendered", () => {
    expect(screen.getByTestId("courses-list-toolbar")).toBeInTheDocument();
  });

  test("search input should work", async () => {
    const user = userEvent.setup();

    const input = screen.getByTestId(
      "courses-list-toolbar-search"
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
    await user.type(input, "some search text");
    expect(input.value).toBe("some search text");
  });

  test("filter checkbox should work", async () => {
    const user = userEvent.setup();

    const checkbox = screen.getByTestId(
      "courses-list-toolbar-checkbox"
    ) as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
