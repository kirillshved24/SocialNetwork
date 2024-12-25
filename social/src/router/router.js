import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../pages/ProtectedRoute/ProtectedRoute.js';
import { AppRoot } from '../components/Root';

// Ленивый импорт с именованным экспортом
const HomePage = lazy(() => import('../pages/HomePage/index.jsx').then(module => ({ default: module.HomePage })));
const Login = lazy(() => import('../components/Login/index.jsx').then(module => ({ default: module.Login })));
const Register = lazy(() => import('../components/Register/Register.jsx').then(module => ({ default: module.Register })));
const PostsPage = lazy(() => import('../pages/PostPage/index.jsx').then(module => ({ default: module.PostsPage })));
const FriendsPage = lazy(() => import('../pages/FriendsPage/index.jsx').then(module => ({ default: module.FriendsPage })));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoot />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'posts',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute>
              <PostsPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'friends',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute>
              <FriendsPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;