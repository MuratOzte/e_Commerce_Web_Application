import React from "react";
import ReactDOM from "react-dom/client";
import { Error, Homepage, Layout, LoginPage } from "./pages/index.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import ProductsPage from "./pages/ProductsPage.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import ResPassword from "./components/auth/ResetPassword.jsx";
import store from "./store/index.js";
import Orders from "./components/orders/Orders.jsx";
import DiscountedProducts from "./components/products/DiscountedProducts.jsx";
import DiscountedProductsPage from "./pages/DiscountedProductsPage.jsx";

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
        element: <ProductsPage />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "resPassword",
        element: <ResPassword />,
      },
      {
        path: "homepage",
        element: <Homepage />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "discountProducts",
        element: <DiscountedProductsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
