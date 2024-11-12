import React, { useState } from 'react'; // Импортирует React и хук useState
import { useDispatch, useSelector } from 'react-redux'; // Импортирует хуки useDispatch и useSelector для работы с Redux
import { addPost, updatePost } from '../../redux/slices/postSlice'; // Импортирует действия addPost и updatePost из postSlice
import { Container } from '../../ui/Container'; // Импортирует компонент Container
import { Input } from '../../ui/Input'; // Импортирует компонент Input
import { Button } from '../../ui/Button'; // Импортирует компонент Button
import { Title } from '../../ui/Typo'; // Импортирует компонент Title
import * as SC from './styles'; // Импортирует стили в объект SC

export const PostsPage = () => { // Определяет функциональный компонент PostsPage
    const [postText, setPostText] = useState(''); // Состояние для текста заголовка поста
    const [textArea, setTextArea] = useState(''); // Состояние для текста поста
    const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования
    const [currentPostId, setCurrentPostId] = useState(null); // Состояние для ID текущего поста
    const [isPublic, setIsPublic] = useState(true); // Состояние для определения публичности поста

    const { currentUser } = useSelector((state) => state.auth); // Получает текущего пользователя из состояния auth
    const dispatch = useDispatch(); // Создает функцию dispatch для отправки действий в Redux

    const handleAddOrUpdatePost = () => { // Функция для добавления или обновления поста
        if (postText.trim() === '' || textArea.trim() === '') { // Проверяет, не пустые ли поля ввода
            alert('Пост не может быть пустым'); // Выводит предупреждение, если поля пустые
            return;
        }

        if (isEditing) { // Если режим редактирования
            dispatch(updatePost({ id: currentPostId, text: postText, isPublic })); // Отправляет действие для обновления поста
            setIsEditing(false); // Выключает режим редактирования
            setCurrentPostId(null); // Сбрасывает ID текущего поста
        } else {
            dispatch(addPost({ // Отправляет действие для добавления нового поста
                id: Date.now(),
                text: postText,
                textarea: textArea,
                isPublic,
                author: currentUser
            }));
        }

        setPostText(''); // Очищает поле ввода заголовка
        setTextArea(''); // Очищает поле ввода текста
    };

    return (
        <Container>
            <SC.PostFormContainer>
                <Title>Создание поста</Title>
                <Input
                    type="text"
                    placeholder="Введите заголовок поста"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                />
                <SC.TextArea
                    type='text'
                    placeholder="Введите текст поста"
                    value={textArea}
                    onChange={(e) => setTextArea(e.target.value)}
                />
                <SC.RadioGroup>
                    <SC.Label>
                        Общедоступный
                        <SC.Radio
                            type="radio"
                            checked={isPublic}
                            onChange={() => setIsPublic(true)}
                        />
                    </SC.Label>
                    <SC.Label>
                        Только для друзей
                        <SC.Radio
                            type="radio"
                            checked={!isPublic}
                            onChange={() => setIsPublic(false)}
                        />
                    </SC.Label>
                </SC.RadioGroup>
                <Button onClick={handleAddOrUpdatePost}>
                    {isEditing ? 'Обновить пост' : 'Добавить пост'}
                </Button>
            </SC.PostFormContainer>
        </Container>
    );
};