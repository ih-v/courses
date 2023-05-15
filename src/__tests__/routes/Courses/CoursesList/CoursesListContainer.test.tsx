import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useAsyncValue } from "react-router-dom";

import {
  ALL_COURSES_SERIALIZED_DATA as coursesData,
  COURSES_CONTEXT_STATE as state,
} from "../../../__fake__";
import { CoursesListItemMock } from "../../../__mocks__";

import { useCoursesContext } from "../../../../routes/Courses/context/CoursesContext";
import CoursesListContainer from "../../../../routes/Courses/CoursesList/CoursesListContainer";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useAsyncValue: vi.fn(),
}));

vi.mock("../../../../routes/Courses/context/CoursesContext", () => ({
  useCoursesContext: vi.fn(),
}));

vi.mock("../../../../routes/Courses/CoursesList/CoursesListItem", () => {
  return {
    default: CoursesListItemMock,
  };
});

describe("CoursesListContainer component testing", () => {
  const COMPONENT_ID = "courses-list-container";
  const ITEM_MOCK_ID = "courses-list-item-mock";
  const setState = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should be rendered with all items", async () => {
    (useAsyncValue as Mock).mockReturnValue(coursesData);
    (useCoursesContext as Mock).mockReturnValue({
      state,
      setState,
    });

    render(<CoursesListContainer />);

    expect(screen.getByTestId(COMPONENT_ID)).toBeInTheDocument();
    const children = screen.getAllByTestId(ITEM_MOCK_ID);
    expect(children.length).toBe(2);
  });

  test("should be rendered with one item - check search", async () => {
    (useAsyncValue as Mock).mockReturnValue(coursesData);
    (useCoursesContext as Mock).mockReturnValue({
      state: { ...state, search: "the power of" },
      setState,
    });

    render(<CoursesListContainer />);

    expect(screen.getByTestId(COMPONENT_ID)).toBeInTheDocument();
    const children = screen.getAllByTestId(ITEM_MOCK_ID);
    expect(children.length).toBe(1);
  });

  test("should be rendered with one item - check filter rating", async () => {
    (useAsyncValue as Mock).mockReturnValue(coursesData);
    (useCoursesContext as Mock).mockReturnValue({
      state: { ...state, rating: 4 },
      setState,
    });

    render(<CoursesListContainer />);

    expect(screen.getByTestId(COMPONENT_ID)).toBeInTheDocument();
    const children = screen.getAllByTestId(ITEM_MOCK_ID);
    expect(children.length).toBe(1);
  });

  test("should be rendered with one item - check filter locked", async () => {
    (useAsyncValue as Mock).mockReturnValue(coursesData);
    (useCoursesContext as Mock).mockReturnValue({
      state: { ...state, filterLocked: true },
      setState,
    });

    render(<CoursesListContainer />);

    expect(screen.getByTestId(COMPONENT_ID)).toBeInTheDocument();
    const children = screen.getAllByTestId(ITEM_MOCK_ID);
    expect(children.length).toBe(1);
  });
});
