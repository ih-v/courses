import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ICoursePreview } from "../../../types";
import CoursePreview from "../../../routes/Courses/CoursePreview";
import { FAKE_ALL_COURSES_SERIALIZED_DATA as coursesData } from "../../fakeData";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useNavigate: () => mockedUseNavigate,
}));

describe("CoursePreview component testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("CoursePreview must be rendered", () => {
    const item: ICoursePreview = { ...coursesData[0] };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <CoursePreview item={item} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("course-preview")).toBeInTheDocument();
    expect(screen.getByText(/lack of motivation & how/i)).toBeInTheDocument();
    expect(screen.getByText(/mon mar 06 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/reignite your inner drive/i)).toBeInTheDocument();
    expect(screen.getByText(/lessons count: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/your motives, overcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/lessons unlocked/i)).toBeInTheDocument();
  });

  test("CoursePreview must be rendered without optional fields", () => {
    const item: ICoursePreview = { ...coursesData[0] };
    item.meta = { ...coursesData[0].meta };
    item.meta.skills = undefined;
    item.meta.courseVideoPreview = undefined;
    item.containsLockedLessons = true;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <CoursePreview item={item} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("course-preview")).toBeInTheDocument();
    expect(screen.getByText(/lack of motivation & how/i)).toBeInTheDocument();
    expect(screen.queryByText(/your motives, overcoming/i)).toBeNull();
    expect(screen.getByText(/contains locked lessons/i)).toBeInTheDocument();
  });

  test("Redirects when card is clicked", async () => {
    const item: ICoursePreview = { ...coursesData[0] };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <CoursePreview item={item} />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByTestId("course-preview"));
    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith(`course/${item.id}`);
  });
});
