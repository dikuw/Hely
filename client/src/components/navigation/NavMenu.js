import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: flex-start;
    background-color: #fafafa;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 200px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: black;
    }
  }
`;

const Link = styled.a`
  color: black;
  :hover {
    text-decoration: none;
  }
`;

const NavMenu = ({ open }) => {
  return (
    <Ul open={open}>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/">Face</Link></li>
      <li><Link href="/">Eyes</Link></li>
      <li><Link href="/">Brushes</Link></li>
      <li><Link href="/">Cart</Link></li>
      <li><Link href="/">Log in</Link></li>
    </Ul>
  );
};

export default NavMenu;