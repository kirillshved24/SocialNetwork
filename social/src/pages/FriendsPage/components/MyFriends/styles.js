import styled from "styled-components"; 

export const FriendsBlock = styled.div`
display: flex;
    gap: 15px;
    flex-direction: column;
    background: #998383;
    border-radius: 10px;
    max-width: 250px;
    width: 100%;
    margin-top: 20px;
`;
export const FriendsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
export const FriendItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;
export const NoFriendsMessage = styled.p`
  font-style: italic;
  color: #999;
`;
export const ContentBlock=styled.div`
   display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 1000px;
    width: 100%;
    gap: 15px;
    height: 50%;

`