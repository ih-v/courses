import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import VideoPlayer from "../../components/VideoPlayer";

describe("FluidImage component testing", () => {
  test("should be rendered", () => {
    render(<VideoPlayer link="" data-testid="some-test-id" />);

    expect(screen.getByTestId("some-test-id")).toBeInTheDocument();
  });
});
