import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FriendsPage } from './pages/FriendsPage/index.jsx';
import { Login } from './components/Login';
import { PostsPage } from './pages/PostPage'; 
import { AppRoot } from './components/Root';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ProtectedRoute } from './pages/ProtectedRoute/ProtectedRoute.js';
import { Register } from './components/Register/Register.jsx';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoot />,
    children: [
      {
        index: true,
        element: <HomePage />, // Главная страница
      },
      {
        path: 'login',
        element: <Login />, // Страница входа
      },
      {
        path: 'register',
        element: <Register />, // Регистрация
      },
      {
        path: 'posts',
        element: (
          <ProtectedRoute>
            <PostsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'friends',
        element: (
          <ProtectedRoute>
            <FriendsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;