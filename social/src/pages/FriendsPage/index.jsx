import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFriendToServer, fetchFriends } from '../../redux/slices/authSlice';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { Title } from '../../ui/Typo';
import * as SC from './styles';
import { fetchUsers } from '../../api/friendsApi'; 

export const FriendsPage = () => {
    const [availableFriends, setAvailableFriends] = useState([]);
    const { currentUser, friends } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadUsers = async () => {
            if (currentUser) {
                console.log('Загружаем пользователей для:', currentUser.username);
                try {
                    const users = await fetchUsers(currentUser.username); // Запрашиваем пользователей с учетом текущего
                    console.log('Пользователи получены:', users);
                    setAvailableFriends(users.filter(user => !friends.some(f => f.id === user.id)));
                } catch (error) {
                    console.error('Ошибка при загрузке пользователей:', error);
                }
            }
        };

        loadUsers(); // Уберите передачу currentUser как аргумент

        if (currentUser?.id) {
            console.log('Загружаем друзей для пользователя:', currentUser.id);
            dispatch(fetchFriends(currentUser.id)); 
        }
    }, [currentUser, dispatch, friends]);

    const handleAddFriend = (friendId) => {
        if (currentUser) {
            console.log('Добавляем друга с ID:', friendId);
            dispatch(addFriendToServer({ userId: currentUser.id, friendId })) // Обратите внимание на объект
                .unwrap()
                .then(() => {
                    console.log('Друг успешно добавлен.');
                    // Обновляем список доступных друзей
                    setAvailableFriends(availableFriends.filter(f => f.id !== friendId));
                })
                .catch((error) => {
                    console.error('Ошибка при добавлении друга:', error); // Лог для отладки
                });
        }
    };

    return (
        <Container>
            <SC.FriendsBlock>
                <Title>Доступные друзья</Title>
                <SC.FriendsList>
                    {availableFriends.length > 0 ? (
                        availableFriends.map(friend => (
                            <SC.FriendItem key={friend.id}>
                                {friend.username} ({friend.email})
                                <Button onClick={() => handleAddFriend(friend.id)}>Добавить</Button>
                            </SC.FriendItem>
                        ))
                    ) : (
                        <SC.NoFriendsMessage>Нет доступных друзей.</SC.NoFriendsMessage>
                    )}
                </SC.FriendsList>
            </SC.FriendsBlock>
        </Container>
    );
};