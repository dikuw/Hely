import React from 'react';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 4px;
`;

const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid black;
`;

const StyledDiv = styled.div`

`;

class Order extends React.Component {
  render() {
    return (
      <StyledWrapperDiv>
        <StyledHeaderDiv>
          <StyledDiv>Order placed: {this.props.order.orderDate}</StyledDiv>
          <StyledDiv>Total: {this.props.order.status}</StyledDiv>
          <StyledDiv>Ship to: {this.props.order.firstname}</StyledDiv>
          <StyledDiv>Order #: {this.props.order._id}</StyledDiv>
        </StyledHeaderDiv>
      </StyledWrapperDiv>
    )
  }
};

export default Order;