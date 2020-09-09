import React from 'react';
import styled from 'styled-components';

import logo from '../../logo.svg';

const LogoImage = styled.img`
  display: block;
  width: 500px;
  margin: auto;
  padding: 15px;
`;

export default function Logo() {
  return (
    <a href="/">
      <LogoImage src={logo} alt="Hely Cosmetics dot com" />
    </a>
  );
};