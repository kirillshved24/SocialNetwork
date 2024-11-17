import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
    isAuthenticated: Boolean(localStorage.getItem('currentUser')),
    friends: JSON.parse(localStorage.getItem('friends')) || [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, email, isAdmin } = action.payload;
            state.currentUser = { username, email };
            state.isAdmin = isAdmin;
            state.isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify({ username, email }));
            localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAdmin = false;
            state.isAuthenticated = false;
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isAdmin');
        },
        addFriend: (state, action) => {
            if (!state.friends.some(friend => friend.id === action.payload.id)) {
                state.friends.push(action.payload);
                localStorage.setItem('friends', JSON.stringify(state.friends));
            }
        },
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(friend => friend.id !== action.payload.id);
            localStorage.setItem('friends', JSON.stringify(state.friends));
        },
    },
});

export const { login, logout, addFriend, removeFriend } = authSlice.actions;
export default authSlice.reducer;