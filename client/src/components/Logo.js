import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../logo.jpg';

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``;

const LogoImage = styled.img`
  display: block;
  width: 500px;
  margin: auto;
`;

class Logo extends Component {
  render() {
    return (
      <Wrapper href="/">
        <LogoImage src={logo} alt="Hely Cosmetics dot com" />
      </Wrapper>
    )
  }
};

export default Logo;