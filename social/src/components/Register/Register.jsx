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



export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { get, set } = useLocalStorage();

    const { register, handleSubmit, formState: { errors } } = useForm();

   
    const onSubmit = (data) => {
        
        const { username, password, email, isAdmin } = data;
        const newUser = { id: Date.now(), username, password, email, isAdmin };

       
        const users = get('users') || [];
        users.push(newUser);
        set('users', users);

        
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
            </SC.FormWrapper>
        </Container>
    );
};
