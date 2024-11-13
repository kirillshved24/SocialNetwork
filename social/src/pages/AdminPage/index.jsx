import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => { 
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
        if (isAdmin !== true) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h2>Страница администратора</h2>
            <p>Добро пожаловать, администратор! Здесь вы можете управлять постами и пользователями.</p>
        </div>
    );
};