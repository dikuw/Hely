import React from 'react';
import CartItem from './CartItem'
import CartFooter from './CartFooter'
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
    if (!total) {
      return (
        <StyledWrapperDiv>No items in your cart.</StyledWrapperDiv>
      )
    };
    return (
      <StyledWrapperDiv>
        <StyledUl>
          {Object.keys(this.props.cart).map((key, i) => (
            <CartItem key={key} index={key} qty={this.props.cart[key]} item={this.props.inventory[`item${key}`]} addToCart={this.props.addToCart} removeFromCart={this.props.removeFromCart} deleteFromCart={this.props.deleteFromCart} />
          ))}
        </StyledUl>
        <CartFooter total={total} />
      </StyledWrapperDiv>
    )
  }
};

export default Cart;