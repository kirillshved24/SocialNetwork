import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
    // Получаем список постов из Redux
    const posts = useSelector((state) => state.posts.posts);

    return (
        <div className="App">
            <h1>Добро пожаловать на главную страницу!</h1>
            <h2>Список постов:</h2>
            {posts.length === 0 ? (
                <p>Нет постов для отображения.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.text}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;