import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FriendsPage } from './components/FriendsPage';
import { Login } from './components/Login';
import { PostsPage } from './components/PostPage';
import { AdminPage } from './components/AdminPage';
import { AppRoot } from './components/Root';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoot />,
    children: [
      {
        path: '/',
        element: <App />,       // Главная страница
      },
      {
        path: 'login',
        element: <Login />,      // Страница входа
      },
      {
        path: 'posts',
        element: <PostsPage />,  // Страница с постами
      },
      {
        path: 'admin',
        element: <AdminPage />,  // Страница администратора
      },

      {
        path: 'friends',
        element: <FriendsPage />,  // Страница с друзьями
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
