import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: JSON.parse(localStorage.getItem('posts')) || []
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = { ...action.payload, comments: [] };
            state.posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(state.posts));
            console.log("Пост добавлен:", action.payload);
        },
        deletePost: (state, action) => {
            const { postId, currentUser, isAdmin } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post && (isAdmin || post.author?.username === currentUser?.username)) {
                state.posts = state.posts.filter(post => post.id !== postId);
                localStorage.setItem('posts', JSON.stringify(state.posts));
                console.log(`Пост с id ${postId} удален`);
            } else {
                console.error("Удаление отклонено:", postId, "Автор:", post?.author, "Пользователь:", currentUser?.username);
            }
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = { ...state.posts[index], ...action.payload };
                localStorage.setItem('posts', JSON.stringify(state.posts));
                console.log("Пост обновлен:", action.payload);
            }
        },
        addComment: (state, action) => {
            const post = state.posts.find(post => post.id === action.payload.postId);
            if (post) {
                post.comments.push(action.payload.comment);
                localStorage.setItem('posts', JSON.stringify(state.posts));
                console.log("Комментарий добавлен к посту:", action.payload.postId, "Комментарий:", action.payload.comment);
            }
        }
    }
});

export const { addPost, deletePost, updatePost, addComment } = postSlice.actions;
export default postSlice.reducer;