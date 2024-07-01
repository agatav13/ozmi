import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import MainPage from './mainPage/MainPage';
import AdminPanel from './adminPanel/AdminPanel';
import ErrorPage from './shared/ErrorPage';
import AddPost from './adminPanel/components/AddPost';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/admin",
        element: <AdminPanel />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/admin/add-post',
                element: <AddPost />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);