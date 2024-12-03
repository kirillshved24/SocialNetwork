import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Начальное состояние
const initialState = {
    currentUser: null,
    isAdmin: false,
    isAuthenticated: false,
    friends: [],
    status: 'idle', // для отслеживания состояния загрузки
    error: null, // для ошибок
};

// Асинхронные экшены с createAsyncThunk

// Запрос на сервер для загрузки друзей
export const fetchFriends = createAsyncThunk(
    'auth/fetchFriends',
    async (userId, { rejectWithValue }) => {
        if (!userId) {
            return rejectWithValue('Ошибка: userId не указан');
        }
        try {
            const response = await axios.get(`/friends?userId=${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Добавление друга на сервер
export const addFriendToServer = createAsyncThunk(
    'auth/addFriendToServer',
    async ({ userId, friendId }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/friends', { userId, friendId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Удаление друга с сервера
export const removeFriendFromServer = createAsyncThunk(
    'auth/removeFriendFromServer',
    async ({ userId, friendId }, { rejectWithValue }) => {
        try {
            await axios.delete('/friends', { data: { userId, friendId } });
            return { userId, friendId }; // Возвращаем данные для удаления из состояния
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, email, id, isAdmin } = action.payload;
            state.currentUser = { username, email, id };
            state.isAdmin = isAdmin;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAdmin = false;
            state.isAuthenticated = false;
            state.friends = [];
        },
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        addFriend: (state, action) => {
            state.friends.push(action.payload);
        },
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(friend => friend.id !== action.payload.friendId);
        },
    },
    extraReducers: (builder) => {
        builder
            // Обработка успешной загрузки друзей
            .addCase(fetchFriends.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFriends.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.friends = action.payload;
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
           
            .addCase(addFriendToServer.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFriendToServer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.friends.push(action.payload);
            })
            .addCase(addFriendToServer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Обработка успешного удаления друга
            .addCase(removeFriendFromServer.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeFriendFromServer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.friends = state.friends.filter(friend => friend.id !== action.payload.friendId);
            })
            .addCase(removeFriendFromServer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { login, logout, setFriends, addFriend, removeFriend } = authSlice.actions;

export default authSlice.reducer;