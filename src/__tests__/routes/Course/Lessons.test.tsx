import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ILesson } from "../../../types";
import Lesson from "../../../routes/Course/Lesson";
import { FAKE_COURSE_SERIALIZED_DATA as courseData } from "../../fakeData";

describe("Lesson component testing", () => {
  test("component renders selected", () => {
    const orderNum = 0;
    const lesson = courseData.lessons[orderNum] as ILesson;
    const link = lesson.link;
    render(
      <Lesson
        selectedLink={link!}
        item={lesson}
        orderNum={orderNum}
        onClick={() => {}}
      />
    );
    expect(screen.getByTestId("course-lesson")).toBeInTheDocument();
    expect(screen.getByText(/why we lack motivation/i)).toBeInTheDocument();
    expect(screen.getByText(/duration: 00:04:15/i)).toBeInTheDocument();
    expect(screen.getByTestId("course-lesson-button")).toHaveClass(
      "Mui-selected"
    );
  });

  test("component renders disabled", () => {
    const orderNum = 1;
    const lesson = courseData.lessons[orderNum] as ILesson;
    const link = "https://somelink/videos";
    render(
      <Lesson
        selectedLink={link}
        item={lesson}
        orderNum={orderNum}
        onClick={() => {}}
      />
    );
    expect(screen.getByTestId("course-lesson-button")).toHaveClass(
      "Mui-disabled"
    );
  });

  test("onClick works", async () => {
    const orderNum = 0;
    const lesson = courseData.lessons[orderNum] as ILesson;
    const link = "https://somelink/videos";
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Lesson
        selectedLink={link}
        item={lesson}
        orderNum={orderNum}
        onClick={handleClick}
      />
    );
    const button = screen.getByTestId("course-lesson-button");
    await user.click(button);
    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledWith(
      lesson.link,
      lesson.title,
      orderNum
    );
  });
});
