import { version } from "../package.json";

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import "./index.css";
import { store } from "./store/index.ts";
import { sendEvent } from "./store/action.ts";
import { Provider } from "react-redux";
import { canUseAviF } from "./utils/canUseAvif.ts";

window.appVersion = version;

store.dispatch(sendEvent({ type: "DO_INIT" }));

const node = document.getElementById("root");
const root = createRoot(node as HTMLElement);

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

// render just if avif supports
canUseAviF().finally(renderApp);
