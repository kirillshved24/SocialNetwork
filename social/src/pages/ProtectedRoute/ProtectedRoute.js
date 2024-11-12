import React from 'react'; // Импортирует React
import { useSelector } from 'react-redux'; // Импортирует хук useSelector для доступа к состоянию Redux
import { Navigate } from 'react-router-dom'; // Импортирует компонент Navigate для перенаправления

export const ProtectedRoute = ({ children, adminOnly = false }) => { // Определяет компонент ProtectedRoute
    const { isAuthenticated, isAdmin } = useSelector(state => state.auth); // Получает данные аутентификации и роли из состояния auth

    if (!isAuthenticated) { // Если пользователь не аутентифицирован
        return <Navigate to="/login" />; // Перенаправляет на страницу входа
    }

    if (adminOnly && !isAdmin) { // Если маршрут только для администраторов, а пользователь не администратор
        return <Navigate to="/" />; // Перенаправляет на главную страницу
    }

    return children; // Возвращает дочерние элементы, если доступ разрешен
};