import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/index.scss';
import App from './components/App/App';
import Category from './components/Category/Category';
import Home from './components/Home/Home';
import AddArticle from './components/AddArticle/AddArticle';
import SingleProduct from './components/SingleProduct/SingleProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'produits',
        element: <Category />,
      },
      {
        path: 'category/:idCategory/produits',
        element: <Category />,
      },
      {
        path: 'produit/:idArticle',
        element: <SingleProduct />,
      },
      {
        path: 'produit/creation',
        element: <AddArticle />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
