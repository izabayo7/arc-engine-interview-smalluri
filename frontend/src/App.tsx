import React, { FC } from "react";
import { backendUrl } from "./environment";

/**
 * This is the root component for the frontend application.
 */
export const App: FC = (_) => {
  //
  // Do whatever you need to do here to make the frontend work.
  //

  console.log("API URL:", backendUrl);

  return (
    <div>
      <h1>Small URI</h1>

      <label>My URL</label>
      <input data-testid="url" />

      <button>Shorten</button>
    </div>
  );
};
