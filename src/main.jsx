import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    Error,
    Homepage,
    Layout,
    LoginPage,
    DiscountedProductsPage,
    ProductsPage,
    UserComments,
} from './pages/index.js';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import SignUp from './components/auth/SignUp.jsx';
import ResPassword from './components/auth/ResetPassword.jsx';
import store from './store/index.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: '/products/:id',
                element: <ProductsPage />,
            },
            {
                path: 'register',
                element: <SignUp />,
            },
            {
                path: 'resPassword',
                element: <ResPassword />,
            },
            {
                path: 'homepage',
                element: <Homepage />,
            },
            {
                path: 'discountProducts',
                element: <DiscountedProductsPage />,
            },
            {
                path: 'userComments',
                element: <UserComments />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
