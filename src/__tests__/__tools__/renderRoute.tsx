import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { routes } from "../../routes";

export const renderRoute = (path: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
};
