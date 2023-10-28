import React from "react";

import { render } from "@testing-library/react";

import { App } from "./App";

test("renders the App component", () => {
  const { container } = render(<App />);

  expect(container.querySelector("[data-testid=url]")).toBeInTheDocument();
});
