import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App/App';
import Home from './components/Home/Home';
import Category from './components/Category/Category';
import AddArticle from './components/AddArticle/AddArticle';
import store from './store/store';
import SingleArticle from './components/SingleArticle/SingleArticle';
import axios from './api/axios';

import './styles/index.scss';
import getAllArticles from './api/articles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: getAllArticles,
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
        element: <SingleArticle />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
