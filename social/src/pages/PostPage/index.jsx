import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { addPost, updatePost } from '../../redux/slices/postSlice';
import { Container } from '../../ui/Container'; 
import { Input } from '../../ui/Input'; 
import { Button } from '../../ui/Button'; 
import { Title } from '../../ui/Typo'; 
import * as SC from './styles'; 
import { Label } from '../../ui/Label';

export const PostsPage = () => { 
    const [postText, setPostText] = useState(''); 
    const [textArea, setTextArea] = useState(''); 
    const [isEditing, setIsEditing] = useState(false); 
    const [currentPostId, setCurrentPostId] = useState(null); 
    const [isPublic, setIsPublic] = useState(true); 

    const { currentUser } = useSelector((state) => state.auth); 
    const dispatch = useDispatch(); 

    const handleAddOrUpdatePost = () => { 
        if (postText.trim() === '' || textArea.trim() === '') { 
            alert('Пост не может быть пустым'); 
            return;
        }

        if (isEditing) { 
            dispatch(updatePost({ id: currentPostId, text: postText, isPublic })); 
            setIsEditing(false); 
            setCurrentPostId(null); 
        } else {
            dispatch(addPost({ 
                id: Date.now(),
                text: postText,
                textarea: textArea,
                isPublic,
                author: currentUser
            }));
        }

        setPostText(''); 
        setTextArea(''); 
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
                    <Label>
                        Общедоступный
                        <SC.Radio
                            type="radio"
                            checked={isPublic}
                            onChange={() => setIsPublic(true)}
                        />
                    </Label>
                    <Label>
                        Только для друзей
                        <SC.Radio
                            type="radio"
                            checked={!isPublic}
                            onChange={() => setIsPublic(false)}
                        />
                    </Label>
                </SC.RadioGroup>
                <Button onClick={handleAddOrUpdatePost}>
                    {isEditing ? 'Обновить пост' : 'Добавить пост'}
                </Button>
            </SC.PostFormContainer>
        </Container>
    );
};