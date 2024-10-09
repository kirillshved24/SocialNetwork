import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FriendsPage } from './pages/FriendsPage/index.jsx';
import { Login } from './components/Login';
import { PostsPage } from './pages/PostPage'; 
import { AppRoot } from './components/Root';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ProtectedRoute } from './pages/ProtectedRoute/ProtectedRoute.js';
import { Register } from './components/Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoot />,
    children: [
      {
        path: 'login',
        element: <Login />,      // Страница входа
      },
     
      {
        path: 'register',        // Страница регистрации
        element: <Register />,   // Регистрация
      },
      {
        path: 'posts',
        element: (
          <ProtectedRoute>
            <PostsPage />  // Страница с постами
          </ProtectedRoute>
        ),
      },
      {
        path: 'friends',
        element: (
          <ProtectedRoute>
            <FriendsPage />  // Страница с друзьями
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();