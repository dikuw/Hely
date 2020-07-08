import React from 'react';
import CartItem from './CartItem'
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

const StyledBannerDiv = styled.div`
  width: 100%;
  color: #272727;
  background-color: #ffd7d7;
  text-transform: uppercase;
  font-weight: 600;
  padding: 5px 20px;
`;

const StyledWrapperDiv = styled.div`
  min-height: 500px;
  max-width: 1200px;
  display: flex;
  margin: 30px auto;
`;

const StyledUl = styled.ul`
  width: 100%;
`;

const StyledSubTotalDiv = styled.div`

`;

const StyledUpdateCartButton = styled.button`

`;

const StyledCheckoutButton = styled.button`

`;

class Cart extends React.Component {
  render() {
    //  TODO Fix this: cartItemIds is item1, item2, etc; it should be the actual ids
    const cartItemIds = Object.keys(this.props.cart);
    const total = cartItemIds.reduce((prevTotal, key) => {
      //  TODO find cartItem based on id, not key
      const cartItem = this.props.inventory[`item${key}`];
      const count = this.props.cart[key];
      if (cartItem && cartItem.available) {
        return prevTotal + (count * cartItem.price);
      }
      return prevTotal;
    }, 0);

    return (
      <React.Fragment>
        <StyledBannerDiv>Your Cart</StyledBannerDiv>
        <StyledWrapperDiv>
          <StyledUl>
            {Object.values(this.props.cart).map((key, i) => (
              <CartItem key={i} index={i} item={this.props.inventory[`item${key}`]} />
            ))}
          </StyledUl>
        </StyledWrapperDiv>
        <StyledSubTotalDiv>{formatPrice(total)}</StyledSubTotalDiv>
        <StyledUpdateCartButton>Update Cart</StyledUpdateCartButton>
        <StyledCheckoutButton>Checkout</StyledCheckoutButton>
      </React.Fragment>
    )
  }
};

export default Cart;