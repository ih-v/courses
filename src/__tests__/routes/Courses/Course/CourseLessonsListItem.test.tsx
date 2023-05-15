import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { COURSE_SERIALIZED_DATA as courseData } from "../../../__fake__";

import { ICourseLessonsListItem } from "../../../../types";
import CourseLessonsListItem from "../../../../routes/Courses/Course/CourseLessonsListItem";

describe("ICoursesListItem component testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const handleClick = vi.fn();
  const renderComponentWithProps = (
    link: string,
    lesson: ICourseLessonsListItem,
    orderNum: number
  ) => {
    render(
      <CourseLessonsListItem
        selectedLink={link}
        item={lesson}
        orderNum={orderNum}
        onClick={handleClick}
      />
    );
  };

  test("should be rendered in unselected & not disabled mode", async () => {
    const orderNum = 0;
    const lesson = courseData.lessons[orderNum] as ICourseLessonsListItem;
    const link = "https://somelink/videos";
    const user = userEvent.setup();

    renderComponentWithProps(link, lesson, orderNum);

    expect(screen.getByTestId("course-lessons-list-item")).toBeInTheDocument();
    expect(screen.getByText(/why we lack motivation/i)).toBeInTheDocument();
    expect(screen.getByText(/duration: 00:04:15/i)).toBeInTheDocument();
    const button = screen.getByTestId("course-lessons-list-item-button");
    expect(button).not.toHaveClass("Mui-disabled");
    expect(button).not.toHaveClass("Mui-selected");
    await user.click(button);
    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledWith(
      lesson.link,
      lesson.title,
      orderNum
    );
  });

  test("should be rendered in selected mode", async () => {
    const orderNum = 0;
    const lesson = courseData.lessons[orderNum] as ICourseLessonsListItem;
    const link = lesson.link;
    const user = userEvent.setup();

    renderComponentWithProps(link!, lesson, orderNum);

    const button = screen.getByTestId("course-lessons-list-item-button");
    expect(button).toHaveClass("Mui-selected");
    expect(button).not.toHaveClass("Mui-disabled");
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("should be rendered in disabled mode because locked", async () => {
    const orderNum = 1;
    const lesson = courseData.lessons[orderNum] as ICourseLessonsListItem;
    const link = "https://somelink/videos";
    const user = userEvent.setup();

    renderComponentWithProps(link, lesson, orderNum);

    const button = screen.getByTestId("course-lessons-list-item-button");
    expect(button).toHaveClass("Mui-disabled");
    expect(button).not.toHaveClass("Mui-selected");
    await expect(() => user.click(button)).rejects.toThrow(
      /pointer-events: none/
    );
  });

  test("should be rendered in disabled mode because link corrupted", async () => {
    const orderNum = 0;
    const lesson = {
      ...courseData.lessons[orderNum],
      link: "",
    } as ICourseLessonsListItem;
    const link = "https://somelink/videos";
    const user = userEvent.setup();

    renderComponentWithProps(link, lesson, orderNum);

    const button = screen.getByTestId("course-lessons-list-item-button");
    expect(button).toHaveClass("Mui-disabled");
    expect(button).not.toHaveClass("Mui-selected");
    await expect(() => user.click(button)).rejects.toThrow(
      /pointer-events: none/
    );
  });
});
