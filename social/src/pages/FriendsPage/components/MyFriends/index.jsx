import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriends, removeFriendFromServer } from '../../../../redux/slices/authSlice';
import { Button } from '../../../../ui/Button';
import { Title } from '../../../../ui/Typo';
import * as SC from '../MyFriends/styles';

export const MyFriends = () => {
    const { currentUser, friends } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            console.log('Загрузка друзей для текущего пользователя');
            dispatch(fetchFriends(currentUser.id));
        }
    }, [currentUser, dispatch]);

    const handleRemoveFriend = (friend) => {
        console.log('Удаление друга:', friend);
        dispatch(removeFriendFromServer(currentUser.id, friend.id));
    };

    return (
        <SC.FriendsBlock>
            <Title>Ваши друзья</Title>
            <SC.FriendsList>
                {friends.length > 0 ? (
                    friends.map(friend => (
                        <SC.FriendItem key={friend.id}>
                            {friend.username}
                            <Button onClick={() => handleRemoveFriend(friend)}>Удалить</Button>
                        </SC.FriendItem>
                    ))
                ) : (
                    <SC.NoFriendsMessage>У вас нет друзей.</SC.NoFriendsMessage>
                )}
            </SC.FriendsList>
        </SC.FriendsBlock>
    );
};