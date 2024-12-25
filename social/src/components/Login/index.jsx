import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../ui/Container';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Title } from '../../ui/Typo';
import { FormWrapper } from '../Register/styles';


export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findUser = useCallback((username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find((user) => user.username === username && user.password === password);
  }, []);

  const isFormValid = () => {
    if (!username.trim() || !password.trim()) {
      alert('Пожалуйста, введите имя пользователя и пароль');
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = savedUsers.find((u) => u.username === username && u.password === password);
      if (user) {
        dispatch(login({ username: user.username, email: user.email, isAdmin: user.isAdmin }));
        navigate('/');
      } else {
        alert('Неправильное имя пользователя или пароль');
      }
    } else {
      alert('Пожалуйста, введите имя пользователя и пароль');
    }
  };

  return (
    <Container>
      <FormWrapper>

     <Title>Вход</Title>

        <Input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Войти</Button>
      </FormWrapper>
    </Container>
  );
};