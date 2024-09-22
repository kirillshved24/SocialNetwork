import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Простая проверка: если username = 'admin', это администратор, иначе обычный пользователь
        if (username === 'admin') {
            localStorage.setItem('role', 'admin',);
            console.log('Пользователь вошел как администратор');
        } else {
            localStorage.setItem('role', 'user');
            console.log('Пользователь вошел как обычный пользователь');
        }

        // Переход на страницу постов или админки в зависимости от роли
        if (username === 'admin') {
            navigate('/admin');
        } else {
            navigate('/posts');
        }
    };

    return (
        <div>
            <h2>Страница входа</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Имя пользователя:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Введите имя"
                    />
                </label>
                <label>
                    Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                    />
                </label>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};