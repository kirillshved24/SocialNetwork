import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
    isAuthenticated: !!localStorage.getItem('currentUser'),
    friends: JSON.parse(localStorage.getItem('friends')) || [], // Друзья из localStorage
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, isAdmin } = action.payload;
            state.currentUser = username;
            state.isAdmin = isAdmin;
            state.isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(username));
            localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAdmin = false;
            state.isAuthenticated = false;
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isAdmin');
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;