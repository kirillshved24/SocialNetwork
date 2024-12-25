import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { Container } from '../../ui/Container';
import { Title } from '../../ui/Typo/';
import { Button } from '../../ui/Button';
import * as SC from './styles';

export const AppRoot = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Хук для получения текущего маршрута

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

 
  let pageTitle = 'Добро пожаловать в социальную сеть'; 

  if (location.pathname === '/posts') {
    pageTitle = 'Это страница для постов';
  } else if(location.pathname==='/login'){
    pageTitle='Страница авторизации'
  }
  else if(location.pathname==='/register'){
    pageTitle='Страница для регистрации'
  }
  
  else if (location.pathname === '/friends') {
    pageTitle = 'Страница друзей';
  }

  return (
    <Container>
      <Title>{pageTitle}</Title> 
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
