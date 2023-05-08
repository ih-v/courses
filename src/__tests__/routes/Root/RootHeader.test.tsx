import React from "react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RootHeader from "../../../routes/Root/RootHeader";

describe("RootHeader component testing", () => {
  test("header rendering", async () => {
    const themeName = "light";
    const setThemeName = vi.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter
        initialEntries={["/course/352be3c6-848b-4c19-9e7d-54fe68fef183"]}
      >
        <RootHeader themeName={themeName} setThemeName={setThemeName} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("root-header")).toBeInTheDocument();
    const button = screen.getByTestId("root-header-theme-button");
    await user.click(button);
    expect(setThemeName).toHaveBeenCalled();
  });
});
