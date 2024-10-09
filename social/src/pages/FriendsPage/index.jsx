import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../api/friendsApi';
import { useSelector } from 'react-redux';


export const FriendsPage = () => {
    const [availableFriends, setAvailableFriends] = useState([]);
    const [friends, setFriends] = useState([]);
    const { currentUser } = useSelector(state => state.auth);

    useEffect(() => {
        const savedFriends = localStorage.getItem('friends');
        if (savedFriends) {
            setFriends(JSON.parse(savedFriends));
        }
    }, [currentUser]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await fetchUsers(currentUser);
                const filteredFriends = users.filter(user => 
                    !friends.some(friend => friend.id === user.id)
                );
                setAvailableFriends(filteredFriends);
            } catch (error) {
                console.error('Ошибка при загрузке пользователей:', error);
            }
        };

        loadUsers();
    }, [friends, currentUser]);

    const addFriend = (friend) => {
        const updatedFriends = [...friends, friend];
        setFriends(updatedFriends);
        localStorage.setItem('friends', JSON.stringify(updatedFriends));
        setAvailableFriends(availableFriends.filter(f => f.id !== friend.id));
    };

    const removeFriend = (friend) => {
        const updatedFriends = friends.filter(f => f.id !== friend.id);
        setFriends(updatedFriends);
        localStorage.setItem('friends', JSON.stringify(updatedFriends));
        setAvailableFriends([...availableFriends, friend]);
    };

    return (
        <div className>
            <h2>Ваши друзья</h2>
            <ul>
                {friends.length > 0 ? (
                    friends.map(friend => (
                        <div key={friend.id}>
                            {friend.username}
                            <button onClick={() => removeFriend(friend)}>Удалить</button>
                        </div>
                    ))
                ) : (
                    <li>У вас нет друзей.</li>
                )}
            </ul>

            <h3>Доступные для добавления</h3>
            <ul>
                {availableFriends.length > 0 ? (
                    availableFriends.map(friend => (
                        <div key={friend.id}>
                            {friend.username}
                            <button onClick={() => addFriend(friend)}>Добавить</button>
                        </div>
                    ))
                ) : (
                    <div>Нет доступных пользователей для добавления в друзья.</div>
                )}
            </ul>
        </div>
    );
};