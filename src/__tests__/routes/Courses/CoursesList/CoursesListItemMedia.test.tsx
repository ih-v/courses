import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { FluidImageMock, VideoPlayerMock } from "../../../__mocks__";
import { CoursesListItemState } from "../../../../routes/Courses/CoursesList/CoursesListItem";
import CoursesListItemMedia from "../../../../routes/Courses/CoursesList/CoursesListItemMedia";

vi.mock("../../../../components/VideoPlayer", () => {
  return {
    default: VideoPlayerMock,
  };
});

vi.mock("../../../../components/FluidImage", () => {
  return {
    default: FluidImageMock,
  };
});

vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(
  vi.fn(() => Promise.resolve())
);

vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(vi.fn());

describe("CoursesListItemMedia component testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponentWithStatus = (status: CoursesListItemState) => {
    render(
      <CoursesListItemMedia
        status={status}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={vi.fn()}
        onError={vi.fn()}
      />
    );
  };
  const VIDEO_BOX_MOCK_ID = "video-player-mock";
  const IMG_BOX_MOCK_ID = "fluid-image-mock";
  const VIDEO_ID = "courses-list-item-media-video";
  const IDLE_IMG_ID = "courses-list-item-media-img-idle";
  const PENDING_IMG_ID = "courses-list-item-media-img-pending";
  const ERROR_IMG_ID = "courses-list-item-media-img-error";

  test("should be rendered in 'idle' mode - course image showed", () => {
    renderComponentWithStatus("idle");

    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeNull();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toBeNull();
    expect(screen.queryByTestId(IDLE_IMG_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(PENDING_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeNull();
  });

  test("should be rendered in 'pending' mode - loading image showed", () => {
    renderComponentWithStatus("pending");

    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toHaveStyle({ display: "none" });
    expect(screen.queryByTestId(IDLE_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(PENDING_IMG_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeNull();
  });

  test("should be rendered in 'success' mode - show video", () => {
    renderComponentWithStatus("success");

    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeNull();
    expect(screen.queryByTestId(VIDEO_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toHaveStyle({ display: "inherit" });
    expect(screen.queryByTestId(IDLE_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(PENDING_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeNull();
  });

  test("should be rendered in 'error' mode - error image showed", () => {
    renderComponentWithStatus("error");

    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeNull();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toBeNull();
    expect(screen.queryByTestId(IDLE_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(PENDING_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeInTheDocument();
  });

  test("Rendering without videolink - show loading image", () => {
    render(
      <CoursesListItemMedia
        status={"pending"}
        imageLink={"https://somelink/cover.webp"}
        onSuccess={vi.fn()}
        onError={vi.fn()}
      />
    );

    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeNull();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toBeNull();
    expect(screen.queryByTestId(IDLE_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(PENDING_IMG_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeNull();
  });
});
