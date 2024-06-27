import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import MainPage from './mainPage/MainPage';
import AdminPanel from './adminPanel/AdminPanel';
import ErrorPage from './error-page';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/admin",
        element: <AdminPanel />,
        errorElement: <ErrorPage />
    }
]);

const app = document.getElementById('app');
if (app) {
    ReactDOM.createRoot(app).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}