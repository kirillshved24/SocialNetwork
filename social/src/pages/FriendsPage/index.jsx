import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  addFriendToServer } from '../../redux/slices/authSlice';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { Title } from '../../ui/Typo';
import * as SC from './styles';
import axios from 'axios';

export const FriendsPage = () => {
    const [availableFriends, setAvailableFriends] = useState([]);
    const { currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users'); // Эндпоинт для получения всех пользователей
                setAvailableFriends(response.data.filter(user => user.id !== currentUser.id));
            } catch (error) {
                console.error('Ошибка при загрузке пользователей:', error);
            }
        };

        fetchUsers();
    }, [currentUser]);

    const handleAddFriend = (friend) => {
        dispatch(addFriendToServer(currentUser.id, friend.id));
        setAvailableFriends(availableFriends.filter(f => f.id !== friend.id));
    };

    return (
        <Container>
            <SC.FriendsBlock>
                <Title>Доступные друзья</Title>
                <SC.FriendsList>
                    {availableFriends.length > 0 ? (
                        availableFriends.map(friend => (
                            <SC.FriendItem key={friend.id}>
                                {friend.username} ({friend.name})
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