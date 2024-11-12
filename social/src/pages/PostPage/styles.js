import styled from "styled-components";

export const PostFormContainer = styled.div`
      width: 100%;
    max-width: 600px;
    padding: 20px;
    margin: 0 auto;
    background-color: #c3a3a3;
    border-radius: 10px;
  
    display: flex;
    flex-direction: column;
    gap: 20px;

`;

export const TextArea = styled.textarea`
 padding: 10px;
    height: 100px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Radio = styled.input`
  margin: 0;
  padding: 0;
`;
