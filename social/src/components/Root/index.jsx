import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { Container } from '../../ui/Container';
import { Title } from '../../ui/Typo/';
import { Button } from '../../ui/Button';
import * as SC from './styles'

export const AppRoot = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container>
      <Title>Добро пожаловать в социальную сеть</Title>
      <SC.Menu>
        {currentUser && <SC.MenuItem to="/">Главная</SC.MenuItem>}
        {!currentUser && <SC.MenuItem to="/login">Вход</SC.MenuItem>}
        {!currentUser && <SC.MenuItem to="/register">Регистрация</SC.MenuItem>}
        {currentUser && <SC.MenuItem to="/posts">Посты</SC.MenuItem>}
        {currentUser && <SC.MenuItem to="/friends">Друзья</SC.MenuItem>}
        {currentUser && <Button onClick={handleLogout}>Выйти</Button>}
      </SC.Menu>
      
        <Outlet />
      
    </Container>
  );
};
