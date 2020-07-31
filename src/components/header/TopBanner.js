import React from 'react';
import styled from 'styled-components';

const BannerDiv = styled.div`
  display: block;
  width: 100%;
  background-color: var(--vinoTinto);
  color:  var(--almostWhite);
  padding: 7px 10px;
  text-align: center;
`;

class TopBanner extends React.Component {
  render() {
    return (
      <BannerDiv>
        Welcome {this.props.isLoggedIn ? this.props.name : 'guest'}! Bienviendo!
      </BannerDiv>
    )
  }
}

export default TopBanner;