import React from 'react';
import styled from 'styled-components';
import Burger from './Burger.js';

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
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