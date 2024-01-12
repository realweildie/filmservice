import { version } from "../package.json";

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

import "./index.css";
import { store } from "./store/index.ts";
import { sendEvent } from "./store/action.ts";
import { Provider } from "react-redux";

window.appVersion = version;

store.dispatch(sendEvent({ type: "DO_INIT" }));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// we can render our app just in case of browser supports AVIF
