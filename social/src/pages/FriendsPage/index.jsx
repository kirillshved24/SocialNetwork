import React, { useState, useEffect } from 'react'; 
import { fetchUsers } from '../../api/friendsApi'; 
import { useSelector } from 'react-redux'; 
import { Container } from '../../ui/Container'; 
import { Button } from '../../ui/Button'; 
import { Title } from '../../ui/Typo'; 
import * as SC from './styles'; 


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
        const users = await fetchUsers(currentUser.username); 
        const filteredFriends = users.filter(user => !friends.some(friend => friend.id === user.id)); 
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

  return (
    <Container>
      <SC.FriendsBlock>
        <Title>Доступные для добавления</Title>
        <SC.AvailableFriendsList>
          {availableFriends.length > 0 ? (
            availableFriends.map(friend => (
              <SC.FriendItem key={friend.id}>
                {friend.username}
                <Button onClick={() => addFriend(friend)}>Добавить</Button>
              </SC.FriendItem>
            ))
          ) : (
            <SC.NoAvailableFriendsMessage>...Загрузка</SC.NoAvailableFriendsMessage>
          )}
        </SC.AvailableFriendsList>
      </SC.FriendsBlock>
    </Container>
  );
};