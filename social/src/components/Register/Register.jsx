import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Пожалуйста, введите имя пользователя и пароль');
            return;
        }

        console.log('Регистрация пользователя:', username, password);

        // Получаем существующих пользователей из localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Текущие пользователи:', users);

        // Проверяем, существует ли уже пользователь с таким именем
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Пользователь с таким именем уже существует');
            return;
        }

        // Генерируем новый уникальный ID
        const newUser = { id: Date.now(), username, password, isAdmin: false };
        console.log('Новый пользователь:', newUser);

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // Сохраняем в localStorage

        // Логиним нового пользователя сразу после регистрации
        dispatch(login({ username: newUser.username, isAdmin: newUser.isAdmin }));
        console.log('Пользователь залогинен:', newUser.username);

        // Перенаправляем на страницу друзей
        navigate('/friends');
    };

    return (
        <div>
            <h2>Регистрация</h2>
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
            <button onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    );
};