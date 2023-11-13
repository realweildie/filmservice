import React from "react";
import ReactDOM from "react-dom/client";

import { Button } from "@packages/ui";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Button>Hello!</Button>
  </React.StrictMode>
);
