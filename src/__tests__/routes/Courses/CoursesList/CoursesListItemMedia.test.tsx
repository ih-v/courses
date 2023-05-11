import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { VideoPlayerMock } from "../../../__mocks__/VideoPlayerMock";
import CoursePreviewMedia from "../../../../routes/Courses/CoursesList/CoursesListItemMedia";

vi.mock("../../../components/VideoPlayer", () => {
  return {
    default: VideoPlayerMock,
  };
});

vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() =>
  Promise.resolve()
);

vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});

describe("CoursePreviewMedia component testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Rendering with state: 'idle' - show course image", () => {
    render(
      <CoursePreviewMedia
        status={"idle"}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(screen.getByTestId("course-preview-img-idle")).toBeInTheDocument();
    expect(screen.queryByTestId("course-preview-video")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-pending")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-error")).toBeNull();
  });

  test("Rendering with state: 'pending' - show loading image", () => {
    render(
      <CoursePreviewMedia
        status={"pending"}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(
      screen.getByTestId("course-preview-img-pending")
    ).toBeInTheDocument();
    expect(screen.getByTestId("course-preview-video")).toBeInTheDocument();
    expect(screen.getByTestId("course-preview-video")).toHaveStyle({
      display: "none",
    });
    expect(screen.queryByTestId("course-preview-img-idle")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-error")).toBeNull();
  });

  test("Rendering with state: 'success' - show video", () => {
    render(
      <CoursePreviewMedia
        status={"success"}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(screen.getByTestId("course-preview-video")).toBeInTheDocument();
    expect(screen.getByTestId("course-preview-video")).toHaveStyle({
      display: "inherit",
    });
    expect(screen.queryByTestId("course-preview-img-idle")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-pending")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-error")).toBeNull();
  });

  test("Rendering with state: 'error' - show error image", () => {
    render(
      <CoursePreviewMedia
        status={"error"}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(screen.getByTestId("course-preview-img-error")).toBeInTheDocument();
    expect(screen.queryByTestId("course-preview-video")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-idle")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-pending")).toBeNull();
  });

  test("Rendering without videolink - show loading image", () => {
    render(
      <CoursePreviewMedia
        status={"pending"}
        imageLink={"https://somelink/cover.webp"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(
      screen.getByTestId("course-preview-img-pending")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("course-preview-video")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-idle")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-error")).toBeNull();
  });
});
