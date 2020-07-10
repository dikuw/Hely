import React from 'react';
import styled from 'styled-components';
import Burger from './Burger.js';
import CartIcon from './CartIcon.js';

const Nav = styled.nav`
  width: 100%;
  height: 2em;
  display: flex;
  padding: 0px 12vw;
  @media (max-width: 768px) {
    padding-left: 16px;
    padding-bottom: 40px;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
`

class Navigation extends React.Component {
  render() {
    return (
      <Nav>
        <Burger history={this.props.history} />
        <CartIcon />
      </Nav>
    );
  }
};

export default Navigation;