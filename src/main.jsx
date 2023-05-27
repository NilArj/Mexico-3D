import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Loader from "./components/Loader";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  </React.StrictMode>
);
