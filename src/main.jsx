import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { CustomRoutes } from './routes/routes.jsx'

import { store } from "./store/store.js";
import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CustomRoutes />
    </Provider>
  </StrictMode>
);
