import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { login } from '../../redux/slices/authSlice'; 
import { useNavigate } from 'react-router-dom'; 
import { Input } from '../../ui/Input'; 
import { Button } from '../../ui/Button'; 
import { Container } from '../../ui/Container'; 
import { Title } from '../../ui/Typo'; 
import * as SC from './styles'; 

export const Register = () => {
    const [username, setUserName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    // Функция для проверки заполненности полей
    const isFormValid = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Пожалуйста, заполните все поля');
            return false;
        }
        return true;
    };

    // Функция для добавления нового пользователя
    const addNewUser = (newUser) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    };

    const handleRegister = () => {
        if (!isFormValid()) return;

        const newUser = { 
            id: Date.now(),  // Можно заменить на более безопасное создание уникального ID
            username, 
            password, 
            isAdmin: false 
        };

        addNewUser(newUser);  // Добавляем пользователя
        dispatch(login({ username, isAdmin: false }));  // Логиним пользователя
        navigate('/');  // Переходим на главную страницу
    };

    return (
        <Container>
            <SC.FormWrapper>
                <Title>Регистрация</Title>
                <Input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleRegister}>Зарегистрироваться</Button>
            </SC.FormWrapper>
        </Container>
    );
};