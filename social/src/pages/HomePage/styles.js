 import styled from "styled-components";

export const UserInfo = styled.div`
 display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: 350px;
    margin: 20px 0;
    background-color: #b89898;
`;
export const UserIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #555;
`;

export const UserDetails = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
export const ContentWrapper = styled.div`
    display: flex;
    gap: 15px;
    max-width: 1000px;
    width: 100%;
`