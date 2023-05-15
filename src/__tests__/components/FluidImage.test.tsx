import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import FluidImage from "../../components/FluidImage";

describe("FluidImage component testing", () => {
  test("should be rendered", () => {
    render(<FluidImage data-testid="some-test-id" />);

    expect(screen.getByTestId("some-test-id")).toBeInTheDocument();
  });
});
