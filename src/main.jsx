import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Html } from "@react-three/drei";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Shop from "./pages/Shop";
import Stadium from "./pages/Stadium";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/stadium",
        element: <Stadium />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
