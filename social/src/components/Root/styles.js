import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Menu = styled.div`
display: flex;
    gap: 15px;
    justify-content: space-between;
    max-width: 580px;
    margin: 0 auto;
    flex-wrap: wrap;
    margin-top:40px;
`

export const MenuItem = styled(NavLink)`
font-size:16px;
text-decoration:none;
color:black;

&.active{
color:red;
}

&:hover{
text-decoration:underline;
}
`




export const UserDetails = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
