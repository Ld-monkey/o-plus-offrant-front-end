import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/index.scss';
import App from './components/App/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      path: 'produits',
      element: 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
