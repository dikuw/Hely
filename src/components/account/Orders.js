import React from 'react';
import Order from './Order';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 4px;
`;

const StyledUl = styled.ul`
  width: 100%;
`;

class Orders extends React.Component {
  render() {
    const userOrders = this.props.userOrders;
    if (!userOrders) {
      return (
        <StyledWrapperDiv>No orders found.</StyledWrapperDiv>
      )
    };
    return (
      <StyledWrapperDiv>
        <StyledUl>
          {userOrders.map((item, i) => (
            <Order key={item._id} index={item._id} order={item} />
          ))}
        </StyledUl>
      </StyledWrapperDiv>
    )
  }
};

export default Orders;