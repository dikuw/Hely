import React from 'react';
import Order from './Order';
import styled from 'styled-components';

const StyledLoadingDiv = styled.div`
  text-align: center;
`;

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const StyledUl = styled.ul`
  width: 100%;
`;

class Orders extends React.Component {
  render() {
    const userOrders = this.props.userOrders;
    console.log('userOrders', userOrders);
    if (!userOrders || userOrders===[]) {
      return (
        <StyledWrapperDiv>No orders found.</StyledWrapperDiv>
      )
    };
    if (userOrders.length < 1 || this.props.inventory.length < 1) {
      return <StyledLoadingDiv>Loading... please wait</StyledLoadingDiv>
    }
    return (
      <StyledWrapperDiv>
        <StyledUl>
          {userOrders.map((item, i) => (
            <Order key={item._id} index={item._id} order={item} inventory={this.props.inventory} />
          ))}
        </StyledUl>
      </StyledWrapperDiv>
    )
  }
};

export default Orders;