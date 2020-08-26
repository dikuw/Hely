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

  const total = 999;

  if (!total) {
    return (
      <StyledWrapperDiv>{t("No items in your cart.")}</StyledWrapperDiv>
    )
  }

  return (
    <StyledWrapperDiv>
      <StyledUl>
        {props.cart.map((item) => (
          <CartItem key={item.item.id} index={item.item.id} qty={item.qty} item={item.item} inventory={props.inventory} addToCart={props.addToCart} removeFromCart={props.removeFromCart} deleteFromCart={props.deleteFromCart} />
        ))}
      </StyledUl>
      <CartFooter history={props.history} total={total} />
    </StyledWrapperDiv>
  )
};
