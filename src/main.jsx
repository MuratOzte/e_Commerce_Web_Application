import React from "react";
import ReactDOM from "react-dom/client";
import { Error, Homepage, Layout, LoginPage } from "./pages/index.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Products from "./pages/Products.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import ResPassword from "./components/auth/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "resPassword",
        element: <ResPassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
