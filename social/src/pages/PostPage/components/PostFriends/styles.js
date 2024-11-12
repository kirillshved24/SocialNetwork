import styled from "styled-components";

export const PostListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    max-width: 600px;
    width: 100%;
`;

export const PostList = styled.ul`
 margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 600px;
    width: 100%;
`;
export const PostItem = styled.li`
padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;
    background-color: #978080;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
export const PostAuthor = styled.p`
  font-weight: bold;
  margin-top: 5px;
`;
export const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;
export const CommentItem = styled.li`
  padding: 10px;
  background-color: #eee;
  border-radius: 4px;
  margin-top: 5px;
`;
export const CommentInput = styled.input`
  margin-top: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
export const PostText=styled.p`
    font-size: 26px;
    line-height: 16px;
    align-items: center;
    display: flex;
    flex-direction: column;
    color:white;
`
export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;