import "./index.css"; // import css
import App from "./app";
import store from "./store/store";

import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
      
    </Provider>

  </React.StrictMode>
);
