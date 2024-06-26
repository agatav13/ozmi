import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App';
import AdminPanel from './components/AdminPanel/AdminPanel';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/admin",
                element: <AdminPanel />
            }
        ]
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