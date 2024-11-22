import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = { ...action.payload, comments: [] };
            state.posts.push(newPost);
        },
        deletePost: (state, action) => {
            const { postId, currentUser, isAdmin } = action.payload;
            state.posts = state.posts.filter(post =>
                post.id !== postId || !(isAdmin || post.author?.username === currentUser?.username)
            );
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = { ...state.posts[index], ...action.payload };
            }
        },
        addComment: (state, action) => {
            const post = state.posts.find(post => post.id === action.payload.postId);
            if (post) {
                post.comments.push(action.payload.comment);
            }
        }
    }
});

export const { addPost, deletePost, updatePost, addComment } = postSlice.actions;
export default postSlice.reducer;