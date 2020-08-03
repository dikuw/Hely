import React from 'react';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 4px;
`;

class Order extends React.Component {
  render() {
    return (
      <StyledWrapperDiv>
        This is an order item
      </StyledWrapperDiv>
    )
  }
};

export default Order;