import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import RootMain from "../../../routes/RootLayout/RootLayoutContainer";

describe("component testing", () => {
  test("renders and render children", () => {
    render(
      <RootMain>
        <div data-testid="root-main-children"></div>
      </RootMain>
    );

    expect(screen.getByTestId("root-main")).toBeInTheDocument();
    expect(screen.getByTestId("root-main-children")).toBeInTheDocument();
  });
});
