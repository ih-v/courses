import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FluidImageMock, VideoPlayerMock } from "../../../__mocks__";
import CoursesContextPlayer from "../../../../routes/Courses/context/CoursesContextPlayer";

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

describe("CoursesContextPlayer component testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const VIDEO_BOX_MOCK_ID = "video-player-mock";
  const IMG_BOX_MOCK_ID = "fluid-image-mock";
  const VIDEO_ID = "courses-context-player-video";
  const LOCKED_IMG_ID = "courses-context-player-img-locked";
  const ERROR_IMG_ID = "courses-context-player-img-error";

  test("component renders in standart mode - video should be rendered", () => {
    const link = "https://somelink/videos";
    const title = "some video title";

    render(
      <CoursesContextPlayer link={link} title={title} isDisplayed={true} />
    );

    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeNull();
    expect(screen.queryByTestId(VIDEO_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(LOCKED_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeNull();
  });

  test("component renders with locked lesson", () => {
    const link = "locked";
    const title = "some video title";

    render(
      <CoursesContextPlayer link={link} title={title} isDisplayed={true} />
    );

    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeNull();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toBeNull();
    expect(screen.queryByTestId(LOCKED_IMG_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeNull();
  });

  test("component renders with error from corrupted link", () => {
    const link = "corrupted";
    const title = "some video title";

    render(
      <CoursesContextPlayer link={link} title={title} isDisplayed={true} />
    );

    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeNull();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toBeNull();
    expect(screen.queryByTestId(LOCKED_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeInTheDocument();
  });

  test("component renders with error from video", async () => {
    const link = "https://somelink/videos";
    const title = "some video title";
    const user = userEvent.setup();

    render(
      <CoursesContextPlayer link={link} title={title} isDisplayed={true} />
    );

    const errorButton = screen.getByTestId("video-error-button");
    await user.click(errorButton);
    expect(screen.queryByTestId(VIDEO_BOX_MOCK_ID)).toBeNull();
    expect(screen.queryByTestId(IMG_BOX_MOCK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(VIDEO_ID)).toBeNull();
    expect(screen.queryByTestId(LOCKED_IMG_ID)).toBeNull();
    expect(screen.queryByTestId(ERROR_IMG_ID)).toBeInTheDocument();
  });
});
