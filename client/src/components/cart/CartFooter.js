import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledSubTotalDiv = styled.div`
  text-align: right;
  padding-right: 20px;
  font-weight: 600;
  @media (max-width: 768px) {
    padding-right: 8wv;
  }
`;

const StyledNoteDiv = styled.div`
  text-align: right;
  padding-right: 20px;
  margin-bottom: 4px;
  font-size: 0.8em;
  @media (max-width: 768px) {
    padding-right: 8wv;
  }
`;

const StyledCheckoutButton = styled.button`
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  background: var(--rosaVieja);
  border-color: var(--rosaVieja);
  border-radius: 2px;
  border: 0;
  color: #ffffff;
  display: inline-block;
  height: 45px;
  letter-spacing: 1px;
  line-height: 45px;
  margin: 0;
  padding: 0 25px;
  transition: background-color 300ms ease-out;
  width: auto;
`;

class CartFooter extends React.Component {

  handleClick = () => {
    this.props.history.push("/checkout");
  };

  render() {
    return (
      <StyledWrapperDiv>
        <StyledSubTotalDiv>Subtotal: {formatPrice(this.props.total)}</StyledSubTotalDiv>
        <StyledNoteDiv>Shipping calculated at checkout</StyledNoteDiv>
        <StyledCheckoutButton onClick={() => this.handleClick()}>Checkout</StyledCheckoutButton>
      </StyledWrapperDiv>
    )
  }
};

export default CartFooter;