import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    currentUser: null,
    isAdmin: false,
    isAuthenticated: false,
    friends: [],
};

const authSlice = createSlice({                                      
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, email, id, isAdmin } = action.payload;
            console.log('Вход пользователя:', action.payload);
            state.currentUser = { username, email, id };
            state.isAdmin = isAdmin;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            console.log('Выход пользователя');
            state.currentUser = null;
            state.isAdmin = false;
            state.isAuthenticated = false;
            state.friends = [];
        },
        setFriends: (state, action) => {
            console.log('Установлены друзья:', action.payload);
            state.friends = action.payload;
        },
        addFriend: (state, action) => {
            console.log('Добавлен друг:', action.payload);
            state.friends.push(action.payload);
        },
        removeFriend: (state, action) => {
            console.log('Удален друг:', action.payload);
            state.friends = state.friends.filter(friend => friend.id !== action.payload.id);
        },
    },
});

export const { login, logout, setFriends, addFriend, removeFriend } = authSlice.actions;

export const fetchFriends = (userId) => async (dispatch) => {
    console.log(`Загрузка друзей для userId=${userId}`);
    try {
        const response = await axios.get(`/friends?userId=${userId}`);
        console.log('Друзья загружены:', response.data);
        dispatch(setFriends(response.data));
    } catch (error) {
        console.error('Ошибка при загрузке друзей:', error);
    }
};

export const addFriendToServer = (userId, friendId) => async (dispatch) => {
    console.log(`Добавление друга friendId=${friendId} для userId=${userId}`);
    try {
        const response = await axios.post('/friends', { userId, friendId });
        console.log('Друг добавлен на сервере:', response.data);
        dispatch(addFriend(response.data));
    } catch (error) {
        console.error('Ошибка при добавлении друга:', error);
    }
};

export const removeFriendFromServer = (userId, friendId) => async (dispatch) => {
    console.log(`Удаление друга friendId=${friendId} для userId=${userId}`);
    try {
        await axios.delete('/friends', { data: { userId, friendId } });
        console.log('Друг удален на сервере:', { userId, friendId });
        dispatch(removeFriend({ id: friendId }));
    } catch (error) {
        console.error('Ошибка при удалении друга:', error);
    }
};

export default authSlice.reducer;