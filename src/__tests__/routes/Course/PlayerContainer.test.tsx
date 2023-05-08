import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { VideoPlayerMock } from "../../mocks";
import PlayerContainer from "../../../routes/Course/PlayerContainer";

vi.mock("../../../components/VideoPlayer", () => {
  return {
    default: VideoPlayerMock,
  };
});

describe("PlayerContainer component testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("component renders", () => {
    const link = "https://somelink/videos";
    const title = "some video title";
    render(<PlayerContainer link={link} title={title} isDisplayed={true} />);
    expect(screen.getByTestId("player-container")).toBeInTheDocument();
    expect(screen.getByTestId("player-container-video")).toBeInTheDocument();
    expect(screen.queryByTestId("player-container-img-locked")).toBeNull();
    expect(screen.queryByTestId("player-container-img-error")).toBeNull();
  });

  test("component renders with locked lesson", () => {
    const link = "locked";
    const title = "some video title";
    render(<PlayerContainer link={link} title={title} isDisplayed={true} />);
    expect(
      screen.getByTestId("player-container-img-locked")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("player-container-video")).toBeNull();
    expect(screen.queryByTestId("player-container-img-error")).toBeNull();
  });

  test("component renders with error from corrupted link", () => {
    const link = "corrupted";
    const title = "some video title";
    render(<PlayerContainer link={link} title={title} isDisplayed={true} />);
    expect(
      screen.getByTestId("player-container-img-error")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("player-container-video")).toBeNull();
    expect(screen.queryByTestId("player-container-img-locked")).toBeNull();
  });

  test("component renders with error from video", async () => {
    const link = "https://somelink/videos";
    const title = "some video title";
    render(<PlayerContainer link={link} title={title} isDisplayed={true} />);
    const errorButton = screen.getByTestId("video-error-button");
    expect(errorButton).toBeInTheDocument();
    expect(screen.queryByTestId("player-container-img-error")).toBeNull();
    const user = userEvent.setup();
    await user.click(errorButton);
    expect(
      screen.getByTestId("player-container-img-error")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("player-container-video")).toBeNull();
    expect(screen.queryByTestId("player-container-img-locked")).toBeNull();
  });
});
