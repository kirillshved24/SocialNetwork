import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем роль пользователя
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            // Если не администратор, перенаправляем на страницу входа
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h2>Admin Page</h2>
            <p>Добро пожаловать, администратор! Здесь вы можете управлять постами и пользователями.</p>
        </div>
    );
};