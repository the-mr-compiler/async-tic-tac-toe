import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { router } from "./Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="fix-width p-4 vh-100 d-flex flex-column">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
