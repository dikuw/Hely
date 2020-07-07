import React from 'react';
import styled from 'styled-components';

const BannerDiv = styled.div`
  display: block;
  width: 100%;
  background-color: #ec419f;
  color: white;
  padding: 7px 10px;
  text-align: center;
`;

class Banner extends React.Component {
  render() {
    return (
      <BannerDiv>
        Welcome! Bienviendo!
      </BannerDiv>
    )
  }
}

export default Banner;