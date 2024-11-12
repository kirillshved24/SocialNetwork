import React, { useState, useEffect } from 'react'; // Импортирует React и хуки useState и useEffect
import { fetchUsers } from '../../api/friendsApi'; // Импортирует функцию для получения списка пользователей
import { useSelector } from 'react-redux'; // Импортирует хук useSelector для доступа к состоянию Redux
import { Container } from '../../ui/Container'; // Импортирует компонент Container
import { Button } from '../../ui/Button'; // Импортирует компонент Button
import { Title } from '../../ui/Typo'; // Импортирует компонент Title
import * as SC from './styles'; // Импортирует стили в объект SC


export const FriendsPage = () => {
  const [availableFriends, setAvailableFriends] = useState([]); // Состояние для доступных друзей
  const [friends, setFriends] = useState([]); // Состояние для добавленных друзей
  const { currentUser } = useSelector(state => state.auth); // Получает текущего пользователя из состояния auth

  useEffect(() => { // Эффект для загрузки друзей из localStorage
    const savedFriends = localStorage.getItem('friends'); // Получает сохраненных друзей из localStorage
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends)); // Устанавливает друзей из localStorage в состояние
    }
  }, [currentUser]); // Срабатывает при изменении currentUser

  useEffect(() => { // Эффект для загрузки доступных пользователей
    const loadUsers = async () => { // Асинхронная функция для загрузки пользователей
      try {
        const users = await fetchUsers(currentUser.username); // Получает список пользователей
        const filteredFriends = users.filter(user => !friends.some(friend => friend.id === user.id)); // Фильтрует добавленных друзей
        setAvailableFriends(filteredFriends); // Устанавливает доступных друзей
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error); // Логирует ошибку в консоль
      }
    };
    loadUsers(); // Вызывает функцию загрузки пользователей
  }, [friends, currentUser]); // Срабатывает при изменении friends или currentUser

  const addFriend = (friend) => { // Функция для добавления друга
    const updatedFriends = [...friends, friend]; // Создает новый массив друзей с добавленным другом
    setFriends(updatedFriends); // Обновляет состояние друзей
    localStorage.setItem('friends', JSON.stringify(updatedFriends)); // Сохраняет обновленный список друзей в localStorage
    setAvailableFriends(availableFriends.filter(f => f.id !== friend.id)); // Убирает добавленного друга из доступных
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