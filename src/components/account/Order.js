import React from 'react';
import OrderItem from './OrderItem';
import styled from 'styled-components';
import { format } from 'date-fns'
import { formatPrice } from '../../helpers.js';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

const StyledGridWrapperDiv = styled.div`
  width: 100%;
  margin: 1vw 0 0 0;
  padding: 0.5rem;
  border: 1px solid darkgray;
  border-radius: 4px 0 0 0;
  background: #f5f5f5;
`;

const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSubHeaderDiv = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
`;

const StyledValueDiv = styled.div`
  font-size: 0.9em;
`;

const StyledUl = styled.ul`
  width: 100%;
`;

class Order extends React.Component {
  render() {
    return (
      <StyledWrapperDiv>
        <StyledGridWrapperDiv>
          <StyledHeaderDiv>
            <StyledDiv>
              <StyledSubHeaderDiv>Order placed:</StyledSubHeaderDiv>
              <StyledValueDiv>{format(new Date(this.props.order.orderDate), 'MMMM dd, yyyy')}</StyledValueDiv>
            </StyledDiv>
            <StyledDiv>
              <StyledSubHeaderDiv>Total:</StyledSubHeaderDiv>
              <StyledValueDiv>{formatPrice(this.props.order.total)}</StyledValueDiv>
            </StyledDiv>
            <StyledDiv>
              <StyledSubHeaderDiv>Ship to:</StyledSubHeaderDiv>
              <StyledValueDiv>{this.props.order.customer.firstName + " " + this.props.order.customer.lastName}</StyledValueDiv>
            </StyledDiv>
            <StyledDiv>
              <StyledSubHeaderDiv>Order #: {this.props.order._id}</StyledSubHeaderDiv>
              <StyledValueDiv>Status: {this.props.order.status}</StyledValueDiv>
            </StyledDiv>
          </StyledHeaderDiv>
        </StyledGridWrapperDiv>
        <StyledUl>
          {Object.keys(this.props.order.cart).map((key, i) => (
            <OrderItem key={key} index={key} qty={this.props.order.cart[key]} item={Object.values(this.props.inventory).filter(item => item.id===key)[0]} />
          ))}
        </StyledUl>
      </StyledWrapperDiv>
      
    )
  }
};

export default Order;