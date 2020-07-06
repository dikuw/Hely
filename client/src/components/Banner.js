import React from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'container',
})``;

class Banner extends React.Component {

  render() {
    return (
      <div>
        This is the Banner
      </div>
    )
  }
}

export default Banner;