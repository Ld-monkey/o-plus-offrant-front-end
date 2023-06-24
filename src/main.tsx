import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';
import App from './components/App/App';
import Category from './components/Category/Category';
import Home from './components/Home/Home';
import AddArticle from './components/AddArticle/AddArticle';
import store from './store/store';
import SingleArticle from './components/SingleArticle/SingleArticle';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Profile from './components/Profile/Profile';
import ErrorPage from './components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
        path: 'produit/:idArticle',
        element: <SingleArticle />,
      },
      {
        path: 'produit/creation',
        element: <AddArticle />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
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
