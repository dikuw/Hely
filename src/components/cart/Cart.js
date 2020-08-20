import React from 'react';
import { useTranslation } from "react-i18next";
import CartItem from './CartItem';
import CartFooter from './CartFooter';
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

export default function Cart(props) {
  const { t } = useTranslation();

  const total = Object.keys(props.cart).reduce((prevTotal, key) => {
    const cartItem = Object.values(props.inventory).filter(item => item.id===key)[0];
    const count = props.cart[key];
    if (cartItem && cartItem.available) {
      return prevTotal + (count * cartItem.price);
    }
    return prevTotal;
  }, 0);

  if (!total) {
    return (
      <StyledWrapperDiv>{t("No items in your cart.")}</StyledWrapperDiv>
    )
  }

  return (
    <StyledWrapperDiv>
      <StyledUl>
        {Object.keys(props.cart).map((key, i) => (
          <CartItem key={key} index={key} qty={props.cart[key]} item={Object.values(props.inventory).filter(item => item.id===key)[0]} addToCart={props.addToCart} removeFromCart={props.removeFromCart} deleteFromCart={props.deleteFromCart} />
        ))}
      </StyledUl>
      <CartFooter history={props.history} total={total} />
    </StyledWrapperDiv>
  )
};
