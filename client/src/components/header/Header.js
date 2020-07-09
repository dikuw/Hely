import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const StyledDiv = styled.div`
  margin-bottom: 12px;
`;


class Header extends React.Component {

  render() {
    return (
      <StyledDiv>
        <Logo />
      </StyledDiv>
    )
  }
}

export default Header;