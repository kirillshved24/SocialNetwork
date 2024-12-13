import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';
import { Title } from '../../ui/Typo';
import * as SC from './styles';
import { Label } from '../../ui/Label';
import { useLocalStorage } from '../../hooks/useLocal';
import { validateRegistration } from '../../shared/utils/validation';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { get, set } = useLocalStorage();

    // Проверка формы и валидация
    const handleRegister = () => {
        const validationError = validateRegistration({ username, email, password });
        if (validationError) {
            alert(validationError);
            return;
        }

        // Генерация нового пользователя с уникальным id
        const newUser = { id: Date.now(), username, password, email, isAdmin };
        
        // Добавление пользователя в локальное хранилище
        const users = get('users') || [];
        users.push(newUser);
        set('users', users);

        // Логин пользователя
        dispatch(login({ id: newUser.id, username, email, isAdmin }));
        navigate('/');
    };

    return (
        <Container>
            <SC.FormWrapper>
                <Title>Регистрация</Title>
                <Input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Введите ваш адрес электронной почты"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Label>
                    <Input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={() => setIsAdmin((prevState) => !prevState)}
                    />
                    Сделать меня администратором
                </Label>
                <Button onClick={handleRegister}>Зарегистрироваться</Button>
            </SC.FormWrapper>
        </Container>
    );
};