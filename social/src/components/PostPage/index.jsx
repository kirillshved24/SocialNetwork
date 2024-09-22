import React, { useEffect } from 'react';

export const PostsPage = () => {
    useEffect(() => {
        const role = localStorage.getItem('role');
        console.log('Текущая роль пользователя:', role);
    }, []);

    return (
        <div>
            <h2>Страница с постами</h2>
            {/* Здесь будет список постов */}
        </div>
    );
};