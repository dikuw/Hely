import React from 'react';
import styled from 'styled-components';

const StyledBannerDiv = styled.div`
  width: 100%;
  color: var(--almostWhite);
  background-color: var(--rosaVieja);
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: 400;
  padding: 5px 20px;
  text-align: center;
`;

class Banner extends React.Component {
  render() {
    return (
      <StyledBannerDiv>{this.props.bannerString}</StyledBannerDiv>
    )
  }
}

export default Banner;