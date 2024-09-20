import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AppRoot = () => {
    return (
        <div>
            <header>
                <h1>Добро ппожаловать в социальную сеть</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/login">Вход</Link></li>
                        <li><Link to="/posts">Посты</Link></li>
                        <li><Link to="/friends">Друзья</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet /> {/* Это место будет динамически заменяться содержимым дочерних маршрутов */}
            </main>
        </div>
    );
}