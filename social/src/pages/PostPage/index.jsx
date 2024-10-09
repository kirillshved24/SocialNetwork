import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, updatePost, addComment } from '../../redux/slices/postSlice';

export const PostsPage = () => {
    const [postText, setPostText] = useState('');
    const [commentText, setCommentText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [isPublic, setIsPublic] = useState(true);

    const posts = useSelector((state) => state.posts.posts);
    const { currentUser, isAdmin } = useSelector((state) => state.auth); 
    const friends = JSON.parse(localStorage.getItem('friends')) || [];
    const dispatch = useDispatch();

    const handleAddOrUpdatePost = () => {
        if (postText.trim() === '') {
            alert('Пост не может быть пустым');
            return;
        }

        if (isEditing) {
            dispatch(updatePost({ id: currentPostId, text: postText, isPublic }));
            console.log("Обновление поста с id:", currentPostId, "Текст:", postText);
            setIsEditing(false);
            setCurrentPostId(null);
        } else {
            dispatch(addPost({
                id: Date.now(),
                text: postText,
                isPublic,
                author: currentUser // Используем currentUser как автора
            }));
            console.log("Добавление нового поста:", postText);
        }

        setPostText(''); // Очищаем поле после добавления/редактирования поста
    };

    const handleAddComment = (postId) => {
        if (commentText.trim() === '') {
            alert('Комментарий не может быть пустым');
            return;
        }

        const newComment = {
            id: Date.now(),
            text: commentText,
            author: currentUser.username // Используем username для автора комментария
        };

        dispatch(addComment({ postId, comment: newComment }));
        console.log("Добавление комментария к посту с id:", postId, "Комментарий:", newComment);
        setCommentText(''); // Очищаем поле после добавления комментария
    };

    const canSeePost = (post) => {
        if (post.isPublic || isAdmin) return true; // Пост общедоступен или пользователь админ
        return friends.some(friend => friend.username === post.author); // Пост доступен только друзьям
    };

    const canDeletePost = (post) => {
        return isAdmin || post.author === currentUser.username; // Только администратор или автор могут удалить пост
    };

    return (
        <div>
            <h2>Страница с постами</h2>
            <input
                type="text"
                placeholder="Введите текст"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
            />
            <div>
                <label>
                    <input
                        type="radio"
                        checked={isPublic}
                        onChange={() => setIsPublic(true)}
                    />
                    Общедоступный
                </label>
                <label>
                    <input
                        type="radio"
                        checked={!isPublic}
                        onChange={() => setIsPublic(false)}
                    />
                    Только для друзей
                </label>
            </div>
            <button onClick={handleAddOrUpdatePost}>
                {isEditing ? 'Обновить пост' : 'Добавить пост'}
            </button>

            <h3>Список постов</h3>
            <ul>
                {posts
                    .filter(post => canSeePost(post)) // Фильтруем посты по видимости
                    .map((post) => (
                    <li key={post.id}>
                        <p>{post.text}</p>
                        <p><strong>Автор:</strong> {post.author}</p>
                        <div>
                            {canDeletePost(post) && (
                                <button onClick={() => {
                                    dispatch(deletePost({ postId: post.id, currentUser, isAdmin }));
                                    console.log(`Запрос на удаление поста с id: ${post.id}`);
                                }}>
                                    Удалить пост
                                </button>
                            )}
                            {post.author === currentUser.username && (
                                <button onClick={() => {
                                    setIsEditing(true);
                                    setCurrentPostId(post.id);
                                    setPostText(post.text);
                                    setIsPublic(post.isPublic);
                                    console.log("Начало редактирования поста с id:", post.id);
                                }}>Редактировать пост</button>
                            )}
                        </div>

                        <h4>Комментарии</h4>
                        <ul>
                            {post.comments && post.comments.map(comment => (
                                <li key={comment.id}>
                                    {comment.author}: {comment.text}
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Добавить комментарий"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={() => handleAddComment(post.id)}>Добавить комментарий</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};