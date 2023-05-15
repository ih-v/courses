import { describe, test, expect, vi, Mock, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useAsyncError, useRouteError } from "react-router-dom";

import { ERROR_FETCH_DATA, ERROR_ROUTE_DATA } from "../__fake__";
import Error from "../../components/Error";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useAsyncError: vi.fn(),
  useRouteError: vi.fn(),
}));

describe("Error component testing", () => {
  const COMPONENT_ID = "error-component";
  const ERROR_FETCH_ID = "error-fetch";
  const ERROR_ROUTE_ID = "error-route";

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should be rendered with async error", async () => {
    (useAsyncError as Mock).mockReturnValue(ERROR_FETCH_DATA);
    //(useRouteError as Mock).mockReturnValue({});
    render(<Error />);
    expect(screen.queryByTestId(COMPONENT_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ERROR_FETCH_ID)).toBeInTheDocument();
    expect(screen.queryByText(/server error/i)).toBeInTheDocument();
  });

  test("should be rendered with route error", async () => {
    (useRouteError as Mock).mockReturnValue(ERROR_ROUTE_DATA);
    render(<Error />);
    expect(screen.queryByTestId(COMPONENT_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ERROR_ROUTE_ID)).toBeInTheDocument();
    expect(screen.queryByText(/resourse not found/i)).toBeInTheDocument();
  });
});
