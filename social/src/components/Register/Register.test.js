import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Register } from './Register';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Register Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: {
                currentUser: null,
                isAdmin: false,
                isAuthenticated: false,
                friends: [],
            },
        });
    });

    it('renders the registration form correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        );

        // Проверяем наличие элементов
        expect(screen.getByPlaceholderText('Имя пользователя')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Введите ваш адрес электронной почты')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
        expect(screen.getByText('Сделать меня администратором')).toBeInTheDocument();
        expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    });
});