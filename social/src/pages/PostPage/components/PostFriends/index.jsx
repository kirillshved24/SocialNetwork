import React, { useState } from 'react';
import { Button } from '../../../../ui/Button'; 
import { Title } from '../../../../ui/Typo'; 
import * as SC from './styles';


export const PostFriends = ({ posts, currentUser, isAdmin, onDeletePost, onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleAddComment = (postId) => {
        if (!commentText.trim()) {
            alert('Комментарий не может быть пустым');
            return;
        }
        const newComment = { id: Date.now(), text: commentText, author: { username: currentUser.username, name: currentUser.name } };
        onAddComment(postId, newComment);
        setCommentText('');
    };

    const canDeletePost = (post) => isAdmin || (post.author?.username === currentUser?.username);

    return (
        <SC.PostListContainer>
            {posts.length > 0 ? (
                <SC.PostList>
                    {posts.map((post) => (
                        <SC.PostItem key={post.id}>
                            <SC.PostAuthor>{post.author.username}</SC.PostAuthor>
                            <SC.PostText>{post.text}</SC.PostText>

                            {canDeletePost(post) && (
                                <SC.ActionButtons>
                                    <Button onClick={() => onDeletePost(post.id)}>
                                        Удалить пост
                                    </Button>
                                </SC.ActionButtons>
                            )}

                            <Title>Комментарии</Title>
                            <SC.CommentList>
                                {post.comments?.map((comment) => (
                                    <SC.CommentItem key={comment.id}>
                                        {comment.author.username}: {comment.text}
                                    </SC.CommentItem>
                                ))}
                            </SC.CommentList>

                            <SC.CommentInput
                                type="text"
                                placeholder="Добавить комментарий"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <Button onClick={() => handleAddComment(post.id)}>Добавить комментарий</Button>
                        </SC.PostItem>
                    ))}
                </SC.PostList>
            ) : (
                <Title>Нет постов для отображения.</Title>
            )}
        </SC.PostListContainer>
    );
};