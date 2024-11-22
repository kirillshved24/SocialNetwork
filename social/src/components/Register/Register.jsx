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

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { get, set } = useLocalStorage();

    const isFormValid = () => {
        if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
            alert('Пожалуйста, заполните все поля.');
            return false;
        }
        const passwordRegex = /^(?=.*[0-9]).{6,}$/;
        if (!passwordRegex.test(password)) {
            alert('Пароль должен быть не менее 6 символов и содержать хотя бы одну цифру.');
            return false;
        }
        return true;
    };

    const addNewUser = (newUser) => {
        const users = get('users') || [];
        users.push(newUser);
        set('users', users);
    };

    const handleRegister = () => {
        if (!isFormValid()) return;
        const newUser = { id: Date.now(), username, password, email, isAdmin };
        addNewUser(newUser);
        dispatch(login({ username, email, isAdmin }));
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