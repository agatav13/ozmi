import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import MainPage from './mainPage/MainPage';
import AdminPanelWrapper from './adminPanel/AdminPanelWrapper';
import ErrorPage from './error-page';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/admin",
        element: <AdminPanelWrapper />,
        errorElement: <ErrorPage />
    }
]);

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);