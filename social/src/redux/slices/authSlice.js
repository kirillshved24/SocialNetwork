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
        },
        addFriend: (state, action) => {
            if (!state.friends.includes(action.payload)) {
                state.friends.push(action.payload);
                localStorage.setItem('friends', JSON.stringify(state.friends));
            }
        },
        removeFriendAction: (state, action) => { // Renamed to avoid conflicts
            state.friends = state.friends.filter(friend => friend !== action.payload);
            localStorage.setItem('friends', JSON.stringify(state.friends));
        },
    },
});

export const { login, logout, addFriend, removeFriendAction } = authSlice.actions;
export default authSlice.reducer;