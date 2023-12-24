import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Error from './page/Error.jsx';
import MainNav from './components/MainNav.jsx';
import Layout from './page/Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
