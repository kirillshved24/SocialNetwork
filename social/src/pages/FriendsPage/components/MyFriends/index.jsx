import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../../../ui/Button';
import { Title } from '../../../../ui/Typo';
import { removeFriend } from '../../../../redux/slices/authSlice';
import * as SC from './styles';

export const MyFriends = () => {
    const friends = useSelector((state) => state.auth.friends); // Друзья из Redux
    const dispatch = useDispatch();

    const handleRemoveFriend = (friend) => {
        dispatch(removeFriend(friend)); // Удаляем друга через Redux
    };

    return (
        <SC.ContentBlock>
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
        </SC.ContentBlock>
    );
};