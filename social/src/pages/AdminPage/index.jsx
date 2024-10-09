import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем роль пользователя
        const role = localStorage.getItem('role');
        console.log('Текущая роль пользователя:', role);

        if (role !== 'admin') {
            console.log('Неавторизованный доступ. Пользователь перенаправлен на страницу входа.');
            navigate('/login');
        } else {
            console.log('Администратор успешно вошел в систему.');
        }
    }, [navigate]);

    return (
        <div>
            <h2>Страница администратора</h2>
            <p>Добро пожаловать, администратор! Здесь вы можете управлять постами и пользователями.</p>
        </div>
    );
};