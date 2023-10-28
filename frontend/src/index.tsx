import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

/**
 * This is the entry point for the frontend application.
 */
document.body.onload = () => {
  const root = document.getElementById("app");
  if (!root) {
    throw new Error("No root element");
  }
  createRoot(root).render(<App />);
};
