import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';


export const AppRoot = () => {
    const { currentUser, isAdmin } = useSelector((state) => state.auth); // Получаем состояние пользователя
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Вызываем действие для выхода
        navigate('/login'); // Перенаправляем на страницу входа
    };

    return (
        <div className>
            <header>
                <h1>Добро пожаловать в социальную сеть</h1>
                <nav>
                    <ul>
                        <Link to="/">Главная</Link>
                        {!currentUser && <Link to="/login">Вход</Link>}
                        {!currentUser && <Link to="/register">Регистрация</Link>}
                        {currentUser && <Link to="/posts">Посты</Link>}
                        {currentUser && <Link to="/friends">Друзья</Link>}
                        {currentUser && <button onClick={handleLogout}>Выйти</button>}
                    </ul>
                </nav>
            </header>

            {currentUser && (
                <div>
                    <p>Вы вошли как: {currentUser} ({isAdmin ? 'Администратор' : 'Пользователь'})</p>
                </div>
            )}

            <main>
                <Outlet /> {/* Это место будет динамически заменяться содержимым дочерних маршрутов */}
            </main>
        </div>
    );
};