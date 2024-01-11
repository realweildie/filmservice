import { version } from "../package.json";

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

import "video.js/dist/video-js.min.css";

window.appVersion = version;

// we need to start app from dispatch here
// im gona skip it not for a long time

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// we can render our app just in case of browser supports AVIF
