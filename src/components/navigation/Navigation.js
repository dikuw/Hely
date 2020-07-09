import React from 'react';
import styled from 'styled-components';
import Burger from './Burger.js';

const Nav = styled.nav`
  width: 100%;
  height: 2em;
  display: flex;
  padding: 0px 12vw;
  @media (max-width: 768px) {
    padding-left: 16px;
    padding-bottom: 40px;
  }
`

class Navigation extends React.Component {
  render() {
    return (
      <Nav>
        <Burger history={this.props.history} />
      </Nav>
    );
  }
};

export default Navigation;