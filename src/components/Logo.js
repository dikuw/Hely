import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../logo.jpg';

const LogoImage = styled.img`
  display: block;
  width: 500px;
  margin: auto;
`;

class Logo extends Component {
  render() {
    return (
      <a href="/">
        <LogoImage src={logo} alt="Hely Cosmetics dot com" />
      </a>
    )
  }
};

export default Logo;