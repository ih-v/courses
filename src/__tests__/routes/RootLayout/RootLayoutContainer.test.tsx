import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import RootLayoutContainer from "../../../routes/RootLayout/RootLayoutContainer";

describe("component testing", () => {
  test("renders and render children", () => {
    render(
      <RootLayoutContainer>
        <div data-testid="root-layout-container-children"></div>
      </RootLayoutContainer>
    );

    expect(screen.getByTestId("root-layout-container")).toBeInTheDocument();
    expect(
      screen.getByTestId("root-layout-container-children")
    ).toBeInTheDocument();
  });
});
