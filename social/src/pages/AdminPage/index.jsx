import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'

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
        <Helmet>
        <h2>Страница администратора</h2>
        </Helmet>
            
            <p>Добро пожаловать, администратор! Здесь вы можете управлять постами и пользователями.</p>
        </div>
    );
};