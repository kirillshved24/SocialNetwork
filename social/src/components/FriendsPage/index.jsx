import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../api/friendsApi'

export const FriendsPage = () => {
    const [availableFriends, setAvailableFriends] = useState([]);
    const [friends, setFriends] = useState([]);

    // Загружаем список друзей из localStorage при первом рендере
    useEffect(() => {
        const savedFriends = localStorage.getItem('friends');
        if (savedFriends) {
            setFriends(JSON.parse(savedFriends));
        }
    }, []);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await fetchUsers();
                const filteredFriends = users.filter(user => !friends.some(friend => friend.id === user.id));
                setAvailableFriends(filteredFriends);
            } catch (error) {
                console.error('Ошибка при загрузке пользователей:', error);
            }
        };

        loadUsers();
    }, [friends]);

    // Функция для добавления друга
    const addFriend = (friend) => {
        if (!friends.some(friend => friends.id === friend.id)) {
            const updatedFriends = [...friends, friend];
            setFriends(updatedFriends);
            localStorage.setItem('friends', JSON.stringify(updatedFriends));

            // Убираем друга из списка доступных для добавления
            setAvailableFriends(availableFriends.filter(f => f.id !== friend.id));
        }
    };

    // Функция для удаления друга
    const removeFriend = (friend) => {
        const updatedFriends = friends.filter(f => f.id !== friend.id);
        setFriends(updatedFriends);
        localStorage.setItem('friends', JSON.stringify(updatedFriends));

        // Добавляем друга обратно в список доступных для добавления
        setAvailableFriends([...availableFriends, friend]);
    };

    return (
        <div>
            <h2>Ваши друзья</h2>
            <ul>
                {friends.map(friend => (
                    <li key={friend.id}>
                        {friend.name}
                        <button onClick={() => removeFriend(friend)}>Удалить</button>
                    </li>
                ))}
            </ul>

            <h3>Доступные для добавления</h3>
            <ul>
                {availableFriends.map(friend => (
                    <li key={friend.id}>
                        {friend.name}
                        <button onClick={() => addFriend(friend)}>Добавить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};