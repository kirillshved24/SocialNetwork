import React from 'react';
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
import { useForm } from 'react-hook-form';


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

    const { register, handleSubmit, formState: { errors } } = useForm();

   
    const onSubmit = (data) => {
        
        const { username, password, email, isAdmin } = data;
        const newUser = { id: Date.now(), username, password, email, isAdmin };

       
        const users = get('users') || [];
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

        
        dispatch(login({ id: newUser.id, username, email, isAdmin }));
        set('users', users);

        // Логин пользователя
        dispatch(login({ id: newUser.id, username, email, isAdmin }));
        navigate('/');
    };

    return (
        <Container>
            <SC.FormWrapper>
        
                <Title>Регистрация</Title>
               
                <SC.FormRegistration onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="text"
                        placeholder="Имя пользователя"
                        {...register("username", {
                            required: "Имя пользователя обязательно",
                            minLength: { value: 3, message: "Имя пользователя должно быть не меньше 3 символов" },
                        })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}

                    <Input
                        type="email"
                        placeholder="Введите ваш адрес электронной почты"
                        {...register("email", {
                            required: "Почта обязательна",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Введите корректный адрес электронной почты"
                            }
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <Input
                        type="password"
                        placeholder="Пароль"
                        {...register("password", {
                            required: "Пароль обязателен",
                            minLength: { value: 6, message: "Пароль должен быть не меньше 6 символов" }
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <Label>
                        <Input
                            type="checkbox"
                            {...register("isAdmin")}
                        />
                        Сделать меня администратором
                    </Label>

                    <Button type="submit">Зарегистрироваться</Button>
                </SC.FormRegistration>
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
