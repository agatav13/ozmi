import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css'
import App from './App';

const app = document.getElementById('app');
if (app) {
    ReactDOM.createRoot(app).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}