import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ALL_COURSES_SERIALIZED_DATA as coursesData } from "../../../__fake__";
import { CoursesListItemMediaMock } from "../../../__mocks__";
import { ICoursesListItem } from "../../../../types";

import CoursesListItem from "../../../../routes/Courses/CoursesList/CoursesListItem";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useNavigate: () => mockedUseNavigate,
}));

vi.mock("../../../../routes/Courses/CoursesList/CoursesListItemMedia", () => {
  return {
    default: CoursesListItemMediaMock,
  };
});

describe("CoursesListItem component testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const COMPONENT_ID = "courses-list-item";
  const MEDIA_MOCK_ID = "courses-list-item-media-mock";
  const renderComponentWithItem = (item: ICoursesListItem) => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CoursesListItem item={item} />
      </MemoryRouter>
    );
  };

  test("should be rendered", () => {
    const item: ICoursesListItem = { ...coursesData[0] };

    renderComponentWithItem(item);

    expect(screen.getByTestId(COMPONENT_ID)).toBeInTheDocument();
    expect(screen.getByTestId(MEDIA_MOCK_ID)).toBeInTheDocument();
    expect(screen.getByText(/lack of motivation & how/i)).toBeInTheDocument();
    expect(screen.getByText(/mon mar 06 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/reignite your inner drive/i)).toBeInTheDocument();
    expect(screen.getByText(/lessons count: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/your motives, overcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/lessons unlocked/i)).toBeInTheDocument();
  });

  test("should be rendered without optional fields", () => {
    const item: ICoursesListItem = { ...coursesData[0] };
    item.meta = { ...coursesData[0].meta };
    item.meta.skills = undefined;
    item.meta.courseVideoPreview = undefined;
    item.containsLockedLessons = true;

    renderComponentWithItem(item);

    expect(screen.getByTestId(COMPONENT_ID)).toBeInTheDocument();
    expect(screen.getByTestId(MEDIA_MOCK_ID)).toBeInTheDocument();
    expect(screen.getByText(/lack of motivation & how/i)).toBeInTheDocument();
    expect(screen.queryByText(/your motives, overcoming/i)).toBeNull();
    expect(screen.getByText(/contains locked lessons/i)).toBeInTheDocument();
  });

  test("should redirect when card is clicked", async () => {
    const item: ICoursesListItem = { ...coursesData[0] };
    const user = userEvent.setup();

    renderComponentWithItem(item);

    await user.click(screen.getByTestId(COMPONENT_ID));
    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith(`course/${item.id}`);
  });
});
