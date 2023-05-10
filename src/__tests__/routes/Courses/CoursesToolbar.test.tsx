import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CoursesProvider } from "../../../contexts/CoursesContext";
import CoursesToolbar from "../../../routes/Courses/CoursesList/CoursesListToolbar";

describe("CoursesToolbar component testing", () => {
  test("Should be rendered", async () => {
    const user = userEvent.setup();

    render(
      <CoursesProvider>
        <CoursesToolbar />
      </CoursesProvider>
    );
    expect(screen.getByTestId("courses-toolbar")).toBeInTheDocument();

    const input = screen.getByTestId("search-input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
    await user.type(input, "some search text");
    expect(input.value).toBe("some search text");

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
