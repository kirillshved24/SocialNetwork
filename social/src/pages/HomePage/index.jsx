import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, addComment } from '../../redux/slices/postSlice';
import { Container } from '../../ui/Container';
import { Title } from '../../ui/Typo';
import * as SC from './styles';
import { MyFriends } from '../FriendsPage/components/MyFriends';
import { PostFriends } from '../PostPage/components/PostFriends';

export const HomePage = () => {
  const posts = useSelector((state) => state.posts.posts);
  const { currentUser, isAdmin, friends } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  // Логирование списка друзей
  console.log("Список друзей на главной странице:", friends);

  // Функция для проверки, является ли пользователь другом
  const isFriend = (postAuthor) => {
    console.log("Автор поста:", postAuthor);  // Лог для проверки автора поста
    return friends.some((friend) => friend.username === postAuthor.username);
  };

  const visiblePosts = posts.filter((post) => post.isPublic || isFriend(post.author) || isAdmin);

  const handleDeletePost = (postId) => {
    dispatch(deletePost({ postId, currentUser, isAdmin }));
  };

  const handleAddComment = (postId, newComment) => {
    dispatch(addComment({ postId, comment: newComment }));
  };

  return ( 
    <Container>
      <Title>Добро пожаловать на главную страницу!</Title>
      {currentUser && (
        <SC.UserInfo>
          <SC.UserIcon />
          <SC.UserDetails>
            <p>{currentUser.email} ({isAdmin ? 'Администратор' : 'Пользователь'})</p>
          </SC.UserDetails>
        </SC.UserInfo>
      )}
      <SC.ContentWrapper>
        <MyFriends currentUser={currentUser}/>
        <PostFriends
          posts={visiblePosts}
          currentUser={currentUser}
          isAdmin={isAdmin}
          onDeletePost={handleDeletePost}
          onAddComment={handleAddComment}
        />
      </SC.ContentWrapper>
    </Container>
  );
};