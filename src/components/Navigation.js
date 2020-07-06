import React from 'react';
import styled from 'styled-components';
import Links from './Links';

const Container = styled.div`
  display: flex;
  align-content: space-around;
`;

const Nav = styled.nav`
  margin-bottom: 20 px;
`;

class Navigation extends React.Component {
  render() {
    return (
      <Container>
        <Nav>
          <Links />
        </Nav>
      </Container>
    )
  }
}

export default Navigation;