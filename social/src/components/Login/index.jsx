import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Пожалуйста, введите имя пользователя и пароль');
            return;
        }

        // Получаем список пользователей из localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Проверяем, существует ли пользователь
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            dispatch(login({ username: user.username, isAdmin: user.isAdmin }));
            navigate('/'); // Перенаправляем пользователя на главную страницу после входа
        } else {
            alert('Неправильное имя пользователя или пароль');
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};