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
    const total = Object.keys(this.props.cart).reduce((prevTotal, key) => {
      const cartItem = Object.values(this.props.inventory).filter(item => item.id===key)[0];
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
            <CartItem key={key} index={key} qty={this.props.cart[key]} item={Object.values(this.props.inventory).filter(item => item.id===key)[0]} addToCart={this.props.addToCart} removeFromCart={this.props.removeFromCart} deleteFromCart={this.props.deleteFromCart} />
          ))}
        </StyledUl>
        <CartFooter history={this.props.history} total={total} />
      </StyledWrapperDiv>
    )
  }
};

export default Cart;