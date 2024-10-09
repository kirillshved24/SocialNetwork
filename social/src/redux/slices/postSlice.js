import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: JSON.parse(localStorage.getItem('posts')) || []
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push({ ...action.payload, comments: [] });
            localStorage.setItem('posts', JSON.stringify(state.posts));
            console.log("Пост добавлен:", action.payload);
        },
        deletePost: (state, action) => {
            const { postId, currentUser, isAdmin } = action.payload;
            const post = state.posts.find(post => post.id === postId);

            if (post && (isAdmin || post.author === currentUser.username)) {
                state.posts = state.posts.filter(post => post.id !== postId);
                localStorage.setItem('posts', JSON.stringify(state.posts));
                console.log(`Пост с id ${postId} удален пользователем ${currentUser.username}`);
            } else {
                console.error("Не удалось удалить пост:", postId, "Автор поста:", post?.author, "Текущий пользователь:", currentUser.username);
            }
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = {
                    ...state.posts[index],
                    text: action.payload.text,
                    isPublic: action.payload.isPublic,
                };
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