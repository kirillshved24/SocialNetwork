import React, { useState, useEffect } from 'react';
import { Button } from '../../../../ui/Button';
import { Title } from '../../../../ui/Typo';
import { useDispatch } from 'react-redux';
import { removeFriendAction } from '../../../../redux/slices/authSlice'; 
import * as SC from './styles';

export const MyFriends = ({ currentUser }) => {
    const [friends, setFriends] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedFriends = localStorage.getItem('friends');
        if (savedFriends) {
            setFriends(JSON.parse(savedFriends));
        }
    }, [currentUser]);

    const removeFriend = (friend) => {
        const updatedFriends = friends.filter(f => f.id !== friend.id);
        setFriends(updatedFriends);
        localStorage.setItem('friends', JSON.stringify(updatedFriends));
        dispatch(removeFriendAction(friend)); 
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
                                <Button onClick={() => removeFriend(friend)}>Удалить</Button>
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