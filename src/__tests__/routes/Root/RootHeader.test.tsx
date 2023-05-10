import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RootHeader from "../../../routes/RootLayout/RootLayoutHeader";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useNavigate: () => mockedUseNavigate,
}));

describe("RootHeader component testing", () => {
  let header: HTMLElement;
  let navigateButton: HTMLElement | null;
  let themeButton: HTMLElement | null;
  let homeIcon: HTMLElement | null;
  let backIcon: HTMLElement | null;
  let lightThemeIcon: HTMLElement | null;
  let darkThemeIcon: HTMLElement | null;
  const mockedToggleTheme = vi.fn();
  const user = userEvent.setup();

  describe("With 'light' theme and main route", () => {
    beforeEach(() => {
      const themeName = "light";
      const route = "/";
      render(
        <MemoryRouter initialEntries={[route]}>
          <RootHeader themeName={themeName} toggleTheme={mockedToggleTheme} />
        </MemoryRouter>
      );
      header = screen.getByTestId("root-header");
      navigateButton = screen.getByTestId("root-header-navigate-button");
      themeButton = screen.getByTestId("root-header-theme-button");
      homeIcon = screen.queryByTestId("root-header-home-icon");
      backIcon = screen.queryByTestId("root-header-back-icon");
      lightThemeIcon = screen.queryByTestId("root-header-light-theme-icon");
      darkThemeIcon = screen.queryByTestId("root-header-dark-theme-icon");
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("renders", async () => {
      expect(header).toBeInTheDocument();
      expect(navigateButton).toBeInTheDocument();
      expect(themeButton).toBeInTheDocument();
      expect(homeIcon).toBeInTheDocument();
      expect(backIcon).toBeNull();
      expect(lightThemeIcon).toBeInTheDocument();
      expect(darkThemeIcon).toBeNull();
    });

    test("check navigate button", async () => {
      await user.click(navigateButton!);
      expect(mockedUseNavigate).toHaveBeenCalled();
      expect(mockedUseNavigate).toHaveBeenCalledWith("/");
    });

    test("check theme button", async () => {
      await user.click(themeButton!);
      expect(mockedToggleTheme).toHaveBeenCalled();
    });
  });

  describe("With 'dark' theme and nested route", () => {
    beforeEach(() => {
      const themeName = "dark";
      const route = "/course/352be3c6-848b-4c19-9e7d-54fe68fef183";
      render(
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route
              path="course/:courseId"
              element={
                <RootHeader
                  themeName={themeName}
                  toggleTheme={mockedToggleTheme}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      );
      header = screen.getByTestId("root-header");
      navigateButton = screen.getByTestId("root-header-navigate-button");
      themeButton = screen.getByTestId("root-header-theme-button");
      homeIcon = screen.queryByTestId("root-header-home-icon");
      backIcon = screen.queryByTestId("root-header-back-icon");
      lightThemeIcon = screen.queryByTestId("root-header-light-theme-icon");
      darkThemeIcon = screen.queryByTestId("root-header-dark-theme-icon");
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("renders", async () => {
      expect(header).toBeInTheDocument();
      expect(navigateButton).toBeInTheDocument();
      expect(themeButton).toBeInTheDocument();
      expect(homeIcon).toBeNull();
      expect(backIcon).toBeInTheDocument();
      expect(lightThemeIcon).toBeNull();
      expect(darkThemeIcon).toBeInTheDocument();
    });

    test("check navigate button", async () => {
      await user.click(navigateButton!);
      expect(mockedUseNavigate).toHaveBeenCalled();
      expect(mockedUseNavigate).toHaveBeenCalledWith("/");
    });

    test("check theme button", async () => {
      await user.click(themeButton!);
      expect(mockedToggleTheme).toHaveBeenCalled();
    });
  });
});
