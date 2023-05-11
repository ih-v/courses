import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { COURSE_SERIALIZED_DATA as courseData } from "../../../__fake__";

import { ICourseLessonsListItem } from "../../../../types";
import CourseLessonsListItem from "../../../../routes/Courses/Course/CourseLessonsListItem";

describe("ICoursesListItem component testing", () => {
  test("renders as unselected & not disabled", async () => {
    const orderNum = 0;
    const lesson = courseData.lessons[orderNum] as ICourseLessonsListItem;
    const link = "https://somelink/videos";
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <CourseLessonsListItem
        selectedLink={link}
        item={lesson}
        orderNum={orderNum}
        onClick={handleClick}
      />
    );

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

  test("renders as selected", async () => {
    const orderNum = 0;
    const lesson = courseData.lessons[orderNum] as ICourseLessonsListItem;
    const link = lesson.link;
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <CourseLessonsListItem
        selectedLink={link!}
        item={lesson}
        orderNum={orderNum}
        onClick={handleClick}
      />
    );

    const button = screen.getByTestId("course-lessons-list-item-button");
    expect(button).toHaveClass("Mui-selected");
    expect(button).not.toHaveClass("Mui-disabled");
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("renders as disabled because locked", async () => {
    const orderNum = 1;
    const lesson = courseData.lessons[orderNum] as ICourseLessonsListItem;
    const link = "https://somelink/videos";
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <CourseLessonsListItem
        selectedLink={link}
        item={lesson}
        orderNum={orderNum}
        onClick={handleClick}
      />
    );

    const button = screen.getByTestId("course-lessons-list-item-button");
    expect(button).toHaveClass("Mui-disabled");
    expect(button).not.toHaveClass("Mui-selected");
    await expect(() => user.click(button)).rejects.toThrow(
      /pointer-events: none/
    );
  });

  test("renders as disabled because corrupted", async () => {
    const orderNum = 0;
    const lesson = {
      ...courseData.lessons[orderNum],
      link: "",
    } as ICourseLessonsListItem;
    const link = "https://somelink/videos";
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <CourseLessonsListItem
        selectedLink={link}
        item={lesson}
        orderNum={orderNum}
        onClick={handleClick}
      />
    );

    const button = screen.getByTestId("course-lessons-list-item-button");
    expect(button).toHaveClass("Mui-disabled");
    expect(button).not.toHaveClass("Mui-selected");
    await expect(() => user.click(button)).rejects.toThrow(
      /pointer-events: none/
    );
  });
});
