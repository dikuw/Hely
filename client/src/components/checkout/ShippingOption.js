import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

const StyledGroupDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: solid 1px;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 0.25rem;
  label {
    margin: 0;
  }
`;

const StyledDurationDiv = styled.div`
  padding: 0.5rem;
  color: var(--rosaVieja);
`;

const StyledPriceDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
`;

export default function CheckoutShipping(props) {

  const {id, name, price, duration} = props.item;

  return (
    <StyledGroupDiv>
      <input type="radio" id={id} name="shippingMethod" value={name} data-price={price} onChange={props.handleChange} checked={props.shipping.method === name } />
      <label htmlFor={name}>{name}</label>
      <StyledDurationDiv>{duration} business days</StyledDurationDiv>
      <StyledPriceDiv>{formatPrice(price)}</StyledPriceDiv>
    </StyledGroupDiv>
  )
};
