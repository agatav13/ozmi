import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import MainPage from './mainPage/MainPage';
import AdminPanel from './adminPanel/AdminPanel';
import ErrorPage from './shared/ErrorPage';
import AddPost from './adminPanel/components/News/AddPost';
import EditPost from './adminPanel/components/News/EditPost';
import DeletePost from './adminPanel/components/News/DeletePost';
import Default from './adminPanel/components/Default';
import AddCaseStudy from './adminPanel/components/CaseStudies/AddCaseStudy';
import ViewCaseStudy from './adminPanel/components/CaseStudies/ViewCaseStudy';

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
                path: '/admin',
                element: <Default />,
                errorElement: <ErrorPage />
            },
            {
                path: '/admin/add-post',
                element: <AddPost />,
                errorElement: <ErrorPage />
            },
            {
                path: '/admin/edit-post',
                element: <EditPost />,
                errorElement: <ErrorPage />
            },
            {
                path: '/admin/delete-post',
                element: <DeletePost />,
                errorElement: <ErrorPage />
            },
            {
                path: '/admin/add-case-study',
                element: <AddCaseStudy />,
                errorElement: <ErrorPage />
            },
            {
                path: '/admin/view-case-study',
                element: <ViewCaseStudy />,
                errorElement: <ErrorPage />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);