import styled from "styled-components";

// Общий блок для всего компонента друзей
export const FriendsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Элемент друга
export const FriendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  strong {
    color: #333;
  }
`;

// Список доступных для добавления друзей
export const AvailableFriendsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

// Кнопка добавления друга
export const Button = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #5cb85c;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4cae4c;
  }
`;

export const NoAvailableFriendsMessage = styled.div`
  font-style: italic;
  color: #999;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;