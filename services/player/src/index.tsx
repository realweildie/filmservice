import version from "../package.json";

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import { store } from "./store";
import { sendEvent } from "./store/action";
import { Provider } from "react-redux";
import { canUseAviF } from "./utils/canUseAvif";

window.appVersion = version.version;

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
